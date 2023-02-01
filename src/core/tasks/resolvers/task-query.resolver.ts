import { CacheGet } from '../../../common/decorators/cache-get.decorator';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { CheckAuthMiddleware, LoggerMiddleware } from '../../../common/midleware';
import { GetTaskByStatusInputType, GetTaskInputType, GetTasksInputType } from '../models/inputs';
import { GetTasksByStatusResultType, GetTaskResultType, GetTasksResultType } from '../models/results';
import { TaskService } from '../services/task.service';
import { TaskQueryType } from './task-root.resolver';


@Resolver(TaskQueryType)
export class TaskQueryResolver {
    constructor(
        private readonly taskService: TaskService
    ) { }

    @ResolveField(() => GetTaskResultType, { middleware: [LoggerMiddleware, CheckAuthMiddleware] })
    async getTask(@Args() input: GetTaskInputType, @CacheGet() cacheGet: Function): Promise<GetTaskResultType> {
        return await this.taskService.getTask(input, cacheGet);
    }

    //Promise<GetTaskByStatusResultType>
    @ResolveField(() => GetTasksByStatusResultType, { middleware: [LoggerMiddleware, CheckAuthMiddleware] })
    async getTaskByStatus(@Args() input: GetTaskByStatusInputType) {
        return await this.taskService.getTaskByStatus(input);

    }

    @ResolveField(() => GetTasksResultType, { middleware: [LoggerMiddleware, CheckAuthMiddleware] })
    async getTasks(
        @Args() input: GetTasksInputType,
    ): Promise<GetTasksResultType> {
        return await this.taskService.getTasks(input);

    }
}