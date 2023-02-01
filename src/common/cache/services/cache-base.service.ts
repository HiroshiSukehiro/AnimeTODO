import { CacheType } from "../../types/cache-types";
import { InjectRedis, Redis } from "@nestjs-modules/ioredis";
import { Injectable } from "@nestjs/common";
import { CacheOptions } from "../../types/cache-types";

@Injectable()
export class CacheBaseService {
    constructor(
        @InjectRedis() protected readonly redis: Redis
    ) {}

    //obviously
    protected async checkExistsOne(queryType: CacheType, id: number, opts: CacheOptions) {
        const exists = await this.redis.exists(`${queryType.type}:${id}:${opts.type}`);
        return !!exists;
    }

    //delete counter and cached data
    protected async deleteCacheSet(queryType: CacheType, id: number) {
        await this.redis.del(`${queryType.type}:${id}:count`);
        return !!await this.redis.del(`${queryType.type}:${id}:data`);
    }

    //caching some data
    protected async setCacheJson(queryType: CacheType, id: number, data: any) {
        const strData = JSON.stringify(data);
        const value = await this.redis.set(`${queryType.type}:${id}:data`, strData, 'EX', 1800);
        await this.redis.expire(`${queryType.type}:${id}:count`, 1800);
        return value;
    }
    
    //receive cached data
    protected async getCacheJson<T>(queryType: CacheType, id: number): Promise<T | null> {
        const data = await this.redis.get(`${queryType.type}:${id}:data`);
        return data && JSON.parse(data) || null;
    }

    //increase counter and prolongs life time of cache counter
    protected async incCounter(queryType: CacheType, id: number) {
        const keyCount = `${queryType.type}:${id}:count`;
        const exists = !!await this.redis.exists(keyCount);

        if (!exists) {
            await this.redis.set(keyCount, 1, 'EX', 1800)
            return 1;
        } 

        await this.redis.expire(keyCount, 1800);
        const value = await this.redis.incr(keyCount);
        
        return value;
    }


}