import { QueryCacheType } from "../../types/query-type";
import { InjectRedis, Redis } from "@nestjs-modules/ioredis";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../database/prisma.service";

@Injectable()
export class CacheBaseService {
    constructor(
        @InjectRedis() protected readonly redis: Redis,
        protected readonly prismaService: PrismaService
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

    private async incCounter(queryType: QueryCacheType, id: number) {
        const key = `${queryType.query}:${id}:count`;

        await this.redis.setnx(key, 0);
        const value = await this.redis.incr(key);
        return value;
    }

    async resolver(queryType: QueryCacheType, id: number) {
        const exists = await this.checkExistsOne(queryType, id);
        console.log('REDIS EXISTS', exists);
        
        this.incCounter(queryType, id);
    }
}