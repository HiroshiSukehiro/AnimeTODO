import { CacheMutation } from '../../../common/decorators/cache-mutation.decorator';
import { CacheIn } from '../../../common/decorators/cache-in.decorator';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { LoggerMiddleware, CheckAuthMiddleware } from '../../../common/midleware';
import { CreateTaskInputType, GetTasksInputType } from '../models/inputs';
import { CreateTaskResultType, DeleteTaskResultType, EditTaskResultType } from '../models/results';
import { TaskMutationType, TaskRootResolver } from '../resolvers/task-root.resolver';
import { TaskService } from '../services/task.service';
import { EditTaskInputType } from '../models/inputs/edit-task-input';
import { DeleteTaskInputType } from '../models/inputs/delete-task-input';
import { RequestInterceptor } from '../../../common/interceptors/request-interceptor/request.interceptor';
import { UseInterceptors } from '@nestjs/common';
import { RequestDecorator } from '../../../common/decorators/request.decorator';
import { Request } from '@nestjs/common';



@Resolver(TaskMutationType)
export class TaskMutationResolver extends TaskRootResolver {
    constructor(private readonly taskService: TaskService) {
        super();
    }

    @ResolveField(() => CreateTaskResultType, { middleware: [LoggerMiddleware, CheckAuthMiddleware] })
    @UseInterceptors(RequestInterceptor)
    async createTask(@Args() input: CreateTaskInputType, @RequestDecorator() req: Request & { user: { id: number } }): Promise<CreateTaskResultType> {
        return await this.taskService.createTask(input, req);
    }

    @ResolveField(() => EditTaskResultType, { middleware: [LoggerMiddleware, CheckAuthMiddleware] })
    async editTask(@Args() input: EditTaskInputType, @CacheIn('update') cacheIn: Function): Promise<EditTaskResultType> {
        return await this.taskService.editTask(input, cacheIn);
    }

    @ResolveField(() => DeleteTaskResultType, { middleware: [LoggerMiddleware, CheckAuthMiddleware] })
    async deleteTask(@Args() id: DeleteTaskInputType, @CacheIn('delete') cacheIn: Function): Promise<DeleteTaskResultType> {
        return await this.taskService.deleteTask(id, cacheIn);
    }

}