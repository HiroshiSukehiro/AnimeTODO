import { QueryCacheType } from "../../types/query-type";
import { InjectRedis, Redis } from "@nestjs-modules/ioredis";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CacheBaseService {
    constructor(
        @InjectRedis() protected readonly redis: Redis
    ) {}

    private async checkExistsOne(queryType: QueryCacheType, id: number,) {
        const exists = await this.redis.exists(`${queryType.query}:${id}`);
        return !!exists;
    }

    private async setOne() {

    }

    private async setIfNotExists(queryType: QueryCacheType, id: number, data: string) {
        const value = await this.redis.setnx(`${queryType.query}:${id}`, data);
        return value;
    }

    private async inc(queryType: QueryCacheType, id: number,) {
        const value = await this.redis.incr(`${queryType.query}:${id}:count`);
    }

    async resolver(queryType: QueryCacheType, id: number, data: string) {
        const exists = await this.checkExistsOne(queryType, id);
        console.log('REDIS EXISTS', exists);
        
    }
}