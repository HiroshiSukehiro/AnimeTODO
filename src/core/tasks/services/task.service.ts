import { PaginationInputType } from '../../../common/models/pagination/pagination-input';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma.service';
import { CreateTaskInputType, GetTaskByStatusInputType, GetTaskInputType, GetTasksInputType } from '../models/inputs';
import { CreateTaskResultType, DeleteTaskResultType, EditTaskResultType, GetTasksByStatusResultType, GetTaskResultType, GetTasksResultType } from '../models/results';
import { ValidationTaskService } from "./validation-task.service"
import { DeleteTaskInputType } from '../models/inputs/delete-task-input';
import { EditTaskInputType } from '../models/inputs/edit-task-input';


@Injectable()
export class TaskService extends ValidationTaskService {
    constructor(
        private readonly prismaService: PrismaService
    ) {
        super();
    }

    async getTask(input: GetTaskInputType, cacheGet: Function): Promise<GetTaskResultType> {
        const cache = await cacheGet(input.id);

        if (cache) {
            cache.createdAt = cache.createdAt ? new Date(cache.createdAt) : null;
            cache.updatedAt = cache.updatedAt ? new Date(cache.updatedAt) : null;
            cache.expires = cache.expires ? new Date(cache.expires) : null;

            return this.validationTaskSuccess(cache);
        }
        const task = await this.prismaService.task.findUnique({ where: { id: input.id } });

        return this.validationTaskSuccess(task);
    }

    async getTaskByStatus(input: GetTaskByStatusInputType): Promise<GetTasksByStatusResultType> {
        const task = await this.prismaService.task.findMany({
            where: {
                ...input
            }
        })
        return this.validationTaskSuccess(task);
    }

    async getTasks(input: GetTasksInputType): Promise<GetTasksResultType> {
        const where = { ...input };
        delete where.skip;
        delete where.take;

        const skip = input.skip || 0;
        const take = input.take || 10;

        const tasks = await this.prismaService.task.findMany({
            where,
            skip,
            take
        });
        return { tasks, success: true };
    }

    async createTask(input: CreateTaskInputType, req: Request & { user: { id: number } }): Promise<CreateTaskResultType> {
        const data = { ...input, authorId: req.user.id ?? 0 };
        const task = await this.prismaService.task.create({ data })
        return this.validationTaskSuccess(task);
    }

    async editTask(input: EditTaskInputType, cacheIn: Function, req: Request & { user: { id: number } }): Promise<EditTaskResultType> {
        if (input.id === req.user.id) {
            const task = await this.prismaService.task.update({
                where: { id: input.id },
                data: input
            })
            cacheIn(task);
            return this.validationTaskSuccess(task);
        }
        return this.validationTaskSuccess(false);
    }

    async deleteTask(input: DeleteTaskInputType, cacheIn: Function, req: Request & { user: { id: number } }): Promise<DeleteTaskResultType> {
        if (input.id === req.user.id) {
            const task = await this.prismaService.task.delete({ where: { id: input.id } })
            cacheIn(task)
            return this.validationTaskSuccess(task);
        }
        return this.validationTaskSuccess(false);

    }
}