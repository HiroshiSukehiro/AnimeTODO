// import { Task } from "@prisma/client";
import { Args, Context, Int, ResolveField, Resolver } from '@nestjs/graphql';

import { GetTaskInputType } from '../models/inputs/get-task-input';
import { GetTaskResultType } from '../models/results/get-task-result';
import { GetTasksResultType } from '../models/results/get-tasks-result';
import { TaskService } from '../services/task.service';
import { TaskQueryType } from './task-root.resolver';


@Resolver(TaskQueryType)
export class TaskQueryResolver {
    constructor(
        private readonly taskService: TaskService
    ) {}

    @ResolveField(() => GetTaskResultType)
    async getTask(@Args() input: GetTaskInputType): Promise<GetTaskResultType | null> {
        return await this.taskService.getTask(input);
    }

    @ResolveField(() => GetTasksResultType)
    async getTasks(
        @Args('authorId', { nullable: true, type: () => Int }) authorId: number,
        @Args('skip', { nullable: true, type: () => Int }) skip: number,
        @Args('take', { nullable: true, type: () => Int }) take: number,
        @Context() ctx: any,
    ) {
            
        return await this.taskService.getTasks(null);
    }
}