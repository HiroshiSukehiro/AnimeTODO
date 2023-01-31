import { QueryCacheType } from "../../types/query-types";
import { InjectRedis, Redis } from "@nestjs-modules/ioredis";
import { Injectable } from "@nestjs/common";
import { CacheOptions } from "../../types/cache-types";

@Injectable()
export class CacheBaseService {
    constructor(
        @InjectRedis() protected readonly redis: Redis
    ) {}

    //obviously
    protected async checkExistsOne(queryType: QueryCacheType, id: number, opts: CacheOptions) {
        const exists = await this.redis.exists(`${queryType.query}:${id}:${opts.type}`);
        return !!exists;
    }

    //caching some data
    protected async setCacheJson(queryType: QueryCacheType, id: number, data: any) {
        const strData = JSON.stringify(data);
        const value = await this.redis.set(`${queryType.query}:${id}:data`, strData, 'EX', 1800);
        return value;
    }
    
    //receive cached data
    protected async getCacheJson<T>(queryType: QueryCacheType, id: number): Promise<T | null> {
        const data = await this.redis.get(`${queryType.query}:${id}:data`);
        return data && JSON.parse(data) || null;
    }

    //increase counter and prolongs life time of cache counter
    protected async incCounter(queryType: QueryCacheType, id: number) {
        const keyCount = `${queryType.query}:${id}:count`;
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