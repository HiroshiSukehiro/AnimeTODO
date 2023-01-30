import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma.service';
import { CreateTaskInputType, GetTaskByStatusInputType, GetTaskInputType, GetTasksInputType } from '../models/inputs';
import { CreateTaskResultType, DeleteTaskResultType, EditTaskResultType, GetTaskByStatusResultType, GetTaskResultType } from '../models/results';
import {ValidationTaskService} from "./validation-task.service"


@Injectable()
export class TaskService extends ValidationTaskService {
    constructor(
        private readonly prismaService: PrismaService
    ) {
        super();
    }

    async getTask(input: GetTaskInputType): Promise<GetTaskResultType>  {
        const task = await this.prismaService.task.findUnique({where: {id: input.id}});
        return this.validationTaskSuccess(task);
    }

    async getTaskByStatus(input: GetTaskByStatusInputType): Promise<GetTaskByStatusResultType> {
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
    
    async createTask(input: CreateTaskInputType): Promise<CreateTaskResultType> {
        const task = await this.prismaService.task.create({data: {
        ...input,
        createdAt: new Date(),
        updatedAt: new Date()
     }})
     return this.validationTaskSuccess(task);
    }

    async editTask(input: GetTasksInputType): Promise<EditTaskResultType>{
        const task = await this.prismaService.task.update({where: {id: input.id}, data: input})
        return this.validationTaskSuccess(task);
    }

    async deleteTask(input:GetTaskInputType):  Promise<DeleteTaskResultType>{
        const task = await this.prismaService.task.delete({where: {id: input.id}})
        return this.validationTaskSuccess(task);
    }
}