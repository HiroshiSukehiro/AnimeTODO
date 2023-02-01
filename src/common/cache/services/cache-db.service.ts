import { PrismaService } from "../../../database/prisma.service";
import { InjectRedis, Redis } from "@nestjs-modules/ioredis";
import { Injectable } from "@nestjs/common";
import { CacheType, OperationType } from "../../types/cache-types";
import { CacheBaseService } from "./cache-base.service";

@Injectable()
export class CacheDBService extends CacheBaseService {
    constructor(
        @InjectRedis() protected readonly redis: Redis,
        protected readonly prismaService: PrismaService
    ) {
        super(redis)
    }
    
    protected async getDataFromDBById(queryType: CacheType, id: number) {
        switch(queryType.type) {
            case "task": 
                return await this.prismaService.task.findUnique({
                    where: { id }
                })
            case "user":
                return await this.prismaService.user.findUnique({
                    where: { id }
                });
            default: 
                return null;
        }
    }
    
    async receiver<T = any>(queryType: CacheType, id: number): Promise<T | null>{
        const exists = await this.checkExistsOne(queryType, id, { type:"data" });
        if (!exists) return null;
        
        return await this.getCacheJson<T>(queryType, id);
    }

    async mutationResolver(queryType: CacheType, OPType: OperationType, payload: any) {
        // const data = await this.getDataFromDBById(queryType, id);
        // await this.setCacheJson(queryType, id, data);
    }

    async queryResolver(queryType: CacheType, id: number) {
        const counter = await this.incCounter(queryType, id);
        const exists = await this.checkExistsOne(queryType, id, { type: "data" });
        
        console.log('COUNTER', counter);

        if (counter >= 10 && !exists) {
            const data = await this.getDataFromDBById(queryType, id)
            if (data) await this.setCacheJson(queryType, id, data);
        }
        
    }
}