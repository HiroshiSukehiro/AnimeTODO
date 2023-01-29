import { InjectRedis, Redis } from "@nestjs-modules/ioredis";
import { Injectable } from "@nestjs/common";
import { ECheckCategory } from "../enums/check-enum";

@Injectable()
export class CacheBaseService {
    constructor(
        @InjectRedis() private readonly redis: Redis
    ) {}

    private async checkExactExists(checkedCategory: ECheckCategory, id: string[]) {
        await this.redis.exists(`${checkedCategory}:${id}`)
    }

    private async checkExistsAll(checkedCategory: ECheckCategory) {}

    async checkExists(checkedCategory: ECheckCategory, ids: string[] = []) {
        if (!ids.length) {
            // return await this.checkExistsAll();
        }
        return await this.checkExactExists(checkedCategory, ids);
    }

    async setIfNotExists(checkedCategory: ECheckCategory, id: string[]) {

    }
}