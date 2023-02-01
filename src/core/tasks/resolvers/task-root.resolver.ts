import { CacheMutation } from '../../../common/decorators/cache-mutation.decorator';
import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import {
    CreateTaskResultType,
    DeleteTaskResultType,
    EditTaskResultType,
    GetTasksByStatusResultType,
    GetTaskResultType,
    GetTasksResultType,
} from '../models/results';
import { CacheQuery } from '../../../common/decorators/cache-query.decorator';

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

    @Field(() => GetTasksByStatusResultType, {
        description: 'Get a list of tasks by status',
    })
    getTasksByStatus: GetTasksByStatusResultType;
}

@Resolver()
export class TaskRootResolver {
    @CacheMutation({type: 'task'})
    @Mutation(() => TaskMutationType, {
        description: 'Task mutations',
    })
    taskMutations() {
        return {};
    }

    @CacheQuery({type: 'task'})
    @Query(() => TaskQueryType, { 
        description: 'Task queries' 
    })
    taskQueries() {
        return {};
    }
}