// import { Task } from "@prisma/client";
import { PaginationInputType } from '../../../common/models/pagination/pagination-input';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { LoggerMiddleware } from '../../../common/midleware/logger.middleware';
import { GetTaskByStatusInputType, GetTaskInputType, GetTasksInputType } from '../models/inputs';
import { GetTasksByStatusResultType, GetTaskResultType, GetTasksResultType } from '../models/results';
import { TaskService } from '../services/task.service';
import { TaskQueryType } from './task-root.resolver';


@Resolver(TaskQueryType)
export class TaskQueryResolver {
    constructor(
        private readonly taskService: TaskService
    ) {}

    @ResolveField(() => GetTaskResultType, { middleware: [LoggerMiddleware]})
    async getTask(@Args() input: GetTaskInputType): Promise<GetTaskResultType> {
        return await this.taskService.getTask(input);
    }
    
    //Promise<GetTaskByStatusResultType>
    @ResolveField(() => GetTasksByStatusResultType)
    async getTaskByStatus(@Args() input: GetTaskByStatusInputType)  {
        return await this.taskService.getTaskByStatus(input);
        
    }

    @ResolveField(() => GetTasksResultType)
    async getTasks(
        @Args() input: GetTasksInputType,
    ): Promise<GetTasksResultType>{       
        return await this.taskService.getTasks(input);
  
    }
}