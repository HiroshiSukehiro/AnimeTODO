import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma.service';
import { CreateTaskInputType } from '../models/inputs/create-task-input';
import { GetTaskInputType } from '../models/inputs/get-task-input';


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
                ...input
            }
        })
    }
    async createTask(data: CreateTaskInputType){
        return await this.prismaService.task.create({data})
    }
}