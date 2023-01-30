import { QueryCacheType } from "../../types/query-type";
import { InjectRedis, Redis } from "@nestjs-modules/ioredis";
import { Injectable } from "@nestjs/common";
import { CacheOptions } from "../../types/cache-options-type";

@Injectable()
export class CacheBaseService {
    constructor(
        @InjectRedis() protected readonly redis: Redis
    ) {}

    protected async checkExistsOne(queryType: QueryCacheType, id: number, opts: CacheOptions) {
        const exists = await this.redis.exists(`${queryType.query}:${id}:${opts.type}`);
        return !!exists;
    }

    protected async setCacheJson(queryType: QueryCacheType, id: number, data: any) {
        const strData = JSON.stringify(data);
        const value = await this.redis.set(`${queryType.query}:${id}:data`, strData, 'EX', 1800);
        return value;
    }

    protected async incCounter(queryType: QueryCacheType, id: number) {
        const keyCount = `${queryType.query}:${id}:count`;
        const exists = !!await this.redis.exists(keyCount);

        if (!exists) {
            await this.redis.set(keyCount, 1, 'EX', 900)
            return 1;
        } 

        await this.redis.expire(keyCount, 900);
        const value = await this.redis.incr(keyCount);
        
        return value;
    }


}