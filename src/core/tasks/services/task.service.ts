import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma.service';
import { CreateTaskInputType, GetTaskByStatusInputType, GetTaskInputType, GetTasksInputType } from '../models/inputs';
import { GetTaskByStatusResultType, GetTaskResultType } from '../models/results';


@Injectable()
export class TaskService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    private validationTaskSuccess(task: any) {
        if(!task){
            return {
                success: false,
                task: null,
            };
        }
        return{
                success: true,
                task,
            
        }

    }

    async getTask(input: GetTaskInputType): Promise<GetTaskResultType>  {
        const task = await this.prismaService.task.findUnique({where: {id: input.id}});
        return this.validationTaskSuccess(task);
    }

    async getTaskByStatus(input: GetTaskByStatusInputType): Promise<GetTaskByStatusResultType> {
        console.log(input)
        const task = await this.prismaService.task.findMany({
            where: {
                ...input
        }})
        return this.validationTaskSuccess(task);
    }
    
    async getTasks() {
        const tasks = await this.prismaService.task.findMany();
        return this.validationTaskSuccess(tasks);
    }
    
    async createTask(input: CreateTaskInputType){
        const task = await this.prismaService.task.create({data: {
        ...input,
        createdAt: new Date(),
        updatedAt: new Date()
     }})
     return this.validationTaskSuccess(task);
    }

    async editTask(input: GetTasksInputType){
        const task = await this.prismaService.task.update({where: {id: input.id}, data: input})
        return this.validationTaskSuccess(task);
    }

    async deleteTask(input:GetTaskInputType){
        const task = await this.prismaService.task.delete({where: {id: input.id}})
        return this.validationTaskSuccess(task);
    }
}