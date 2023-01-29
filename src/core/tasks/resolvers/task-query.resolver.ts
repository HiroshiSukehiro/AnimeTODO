// import { Task } from "@prisma/client";
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { GetTaskByStatusInputType, GetTaskInputType, GetTasksInputType } from '../models/inputs';
import { GetTaskByStatusResultType, GetTaskResultType, GetTasksResultType } from '../models/results';
import { TaskService } from '../services/task.service';
import { TaskQueryType } from './task-root.resolver';


@Resolver(TaskQueryType)
export class TaskQueryResolver {
    constructor(
        private readonly taskService: TaskService
    ) {}

    @ResolveField(() => GetTaskResultType)
    async getTask(@Args() input: GetTaskInputType): Promise<GetTaskResultType> {
        return await this.taskService.getTask(input);
    }
    
    //Promise<GetTaskByStatusResultType>
    @ResolveField(() => GetTaskByStatusResultType)
    async getTaskByStatus(@Args() input: GetTaskByStatusInputType)  {
        const task = await this.taskService.getTaskByStatus(input)
        console.log(task)
        return await task;
    }

    @ResolveField(() => GetTasksResultType)
    async getTasks(
        @Args() input: GetTasksInputType,
    ) {
        return await this.taskService.getTasks(input);
    }
}