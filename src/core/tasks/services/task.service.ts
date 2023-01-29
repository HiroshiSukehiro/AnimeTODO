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
        const task = await this.prismaService.task.findUnique({where: {id: input.id}});
        if(!!task?.id){
            return { task, success: true }
        }
        return { task: null, success: false }
    }
    
    async getTasks(input: any) {
        return await this.prismaService.task.findMany({
        where: {
            ...input
        }
     })
    }
    
    async createTask(input: CreateTaskInputType){
        return   await this.prismaService.task.create({data: {
        ...input,
        createdAt: new Date(),
        updatedAt: new Date()
     }})
    }
}