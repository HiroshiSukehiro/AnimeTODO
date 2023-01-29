import { CreateTaskResultType } from "../models/results/create-task-result";
import { GetTaskResultType } from "../models/results/get-task-result";
import { Field, Mutation, ObjectType, Query, Resolver } from "@nestjs/graphql";
import { GetTasksResultType } from "../models/results/get-tasks-result";
import { UseInterceptors } from "@nestjs/common";
import { CacheInterceptor } from "../../../common/interceptors/cache-interceptors/cache-interceptors";

@ObjectType()
export class TaskMutationType {
    @Field(() => CreateTaskResultType, {
        description: 'Create task',
    })
    createTask: CreateTaskResultType;
}

@ObjectType()
export class TaskQueryType {
    @Field(() => GetTaskResultType, {
        description: 'Get user by ID',
    })
    getTask: GetTaskResultType;

    @Field(() => GetTasksResultType, {
        description: 'Get task list',
    })
    getTasks: GetTasksResultType;
}

@Resolver()
export class TaskRootResolver {
    @Mutation(() => TaskMutationType, {
        description: 'Task mutations',
    })
    taskMutations() {
        return {};
    }

    @UseInterceptors(CacheInterceptor)
    @Query(() => TaskQueryType, { 
        description: 'Task queries' 
    })
    taskQueries() {
        return {};
    }
}