import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { LoggerMiddleware, CheckAuthMiddleware } from '../../../common/midleware';
import { CreateTaskInputType, GetTaskInputType, GetTasksInputType } from '../models/inputs';
import { CreateTaskResultType, DeleteTaskResultType, EditTaskResultType } from '../models/results';
import { TaskMutationType, TaskRootResolver } from '../resolvers/task-root.resolver';
import { TaskService } from '../services/task.service';



@Resolver(TaskMutationType)
export class TaskMutationResolver extends TaskRootResolver {
    constructor(private readonly taskService: TaskService) {
        super();
    }

    @ResolveField(() => CreateTaskResultType, { middleware: [LoggerMiddleware, CheckAuthMiddleware] })
    async createTask(@Args() input: CreateTaskInputType): Promise<CreateTaskResultType> {
        return await this.taskService.createTask(input);
    }

    @ResolveField(() => EditTaskResultType, { middleware: [LoggerMiddleware, CheckAuthMiddleware] })
    async editTask(@Args() input: GetTasksInputType): Promise<EditTaskResultType> {
        return await this.taskService.editTask(input);
    }

    @ResolveField(() => DeleteTaskResultType, { middleware: [LoggerMiddleware, CheckAuthMiddleware] })
    async deleteTask(@Args() id: GetTaskInputType): Promise<DeleteTaskResultType> {
        return await this.taskService.deleteTask(id);
    }

}