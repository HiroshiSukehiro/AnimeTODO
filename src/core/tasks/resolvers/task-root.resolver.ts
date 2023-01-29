import { CreateTaskResultType } from "../models/results/create-task-result";
import { GetTaskResultType } from "../models/results/get-task-result";
import { Field, Mutation, ObjectType, Query, Resolver } from "@nestjs/graphql";
import { GetTasksResultType } from "../models/results/get-tasks-result";
import { UseInterceptors } from "@nestjs/common";
import { CacheInterceptor, ReqType } from "../../../common/interceptors/cache-interceptor/cache-interceptor";

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

    @ReqType({query: 'task'})
    @UseInterceptors(CacheInterceptor)
    @Query(() => TaskQueryType, { 
        description: 'Task queries' 
    })
    taskQueries() {
        return {};
    }
}