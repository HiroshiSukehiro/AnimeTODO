import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma.service';
import { CreateTaskInputType, GetTaskByStatusInputType, GetTaskInputType, GetTasksInputType } from '../models/inputs';
import { GetTaskByStatusResultType, GetTaskResultType } from '../models/results';


@Injectable()
export class TaskService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async getTask(input: GetTaskInputType): Promise<GetTaskResultType>  {
        const task = await this.prismaService.task.findUnique({where: {id: input.id}});
        if(!!task?.id){
            return { task, success: true }
        }
        return { task: null, success: false }
    }

    async getTaskByStatus(input: GetTaskByStatusInputType): Promise<GetTaskByStatusResultType> {
        console.log(input)
        const task = await this.prismaService.task.findMany({
            where: {
                ...input
        }})
        console.log(task)
        return {task, success: true}
    }
    
    async getTasks() {
        const tasks = await this.prismaService.task.findMany();
        return {tasks, success: true}
    }
    
    async createTask(input: CreateTaskInputType){
        return await this.prismaService.task.create({data: {
        ...input,
        createdAt: new Date(),
        updatedAt: new Date()
     }})
    }

    async editTask(input: GetTasksInputType){
        const task = await this.prismaService.task.update({where: {id: input.id}, data: input})
        return {task, success: true}
    }

    async deleteTask(input:GetTaskInputType){
        const task = await this.prismaService.task.delete({where: {id: input.id}})
        return {task, success: true}
    }
}