import { PrismaService } from "../../../database/prisma.service";
import { Injectable } from "@nestjs/common";
import { GetTaskInputType } from "../models/inputs/get-task-input";


@Injectable()
export class TaskService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async getTask(input: GetTaskInputType) {
        return await this.prismaService.task.findUnique({where: {id: input.id}});
    }
    
    async getTasks(input: any) {
        return await this.prismaService.task.findMany({
            where: {
                
            }
        })
    }
}