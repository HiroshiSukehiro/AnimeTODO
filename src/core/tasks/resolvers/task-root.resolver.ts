import { UseInterceptors } from '@nestjs/common';
import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';

import { CacheInterceptor, ReqType } from '../../../common/interceptors/cache-interceptor/cache-interceptor';
import {
    CreateTaskResultType,
    DeleteTaskResultType,
    EditTaskResultType,
    GetTaskByStatusResultType,
    GetTaskResultType,
    GetTasksResultType,
} from '../models/results';

@ObjectType()
export class TaskMutationType {
    @Field(() => CreateTaskResultType, {
        description: 'Create task',
    })
    createTask: CreateTaskResultType;

    @Field(() => EditTaskResultType, {
        description: 'Edit task',
    })
    editTask: EditTaskResultType;

    @Field(() => DeleteTaskResultType, {
        description: 'Delete task',
    })
    deleteTask: DeleteTaskResultType;
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

    @Field(() => GetTaskByStatusResultType, {
        description: 'Get a list of tasks by status',
    })
    getTasksByStatus: GetTaskByStatusResultType;
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