// import { Task } from "@prisma/client";
import { GetTaskResultType } from "../models/results/get-task-result";
import { Args, Context, Int, Query, ResolveField, Resolver, Root } from "@nestjs/graphql";
import { TaskQueryType } from "./task-root.resolver";
import { GetTaskInputType } from "../models/inputs/get-task-input";
import { TaskService } from "../services/task.service";
import { GetTasksResultType } from "../models/results/get-tasks-result";


@Resolver(TaskQueryType)
export class TaskQueryResolver {
    constructor(
        private readonly taskService: TaskService
    ) {}

    @ResolveField(() => GetTaskResultType)
    async getTask(@Args() input: GetTaskInputType) {
        
        const task = await this.taskService.getTask(input);
        console.log('AAAA', task);

        return { task };
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