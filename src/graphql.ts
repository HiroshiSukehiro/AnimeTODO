
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum TaskStatus {
    PENDING = "PENDING",
    IN_WORK = "IN_WORK",
    COMPLETED = "COMPLETED"
}

export class Task {
    id: number;
    authorId: number;
    name: string;
    description?: Nullable<string>;
    expires: DateTime;
    isCompleted: boolean;
    status: TaskStatus;
    createdAt: DateTime;
    updatedAt?: Nullable<DateTime>;
}

export class CreateTaskResultType {
    success: boolean;
    task?: Nullable<Task>;
}

export class GetTaskResultType {
    success: boolean;
    tasks?: Nullable<Task[]>;
}

export class CreateTaskResultType {
    success: boolean;
    tasks?: Nullable<Task[]>;
}

export class GetTaskByStatusResultType {
    success: boolean;
    task?: Nullable<Task[]>;

}

export class TaskMutationType {
    createTask: CreateTaskResultType;
}

export class TaskQueryType {
    getTask: GetTaskResultType;
    getTasks: GetTasksResultType;
    getTasksByStatus: GetTaskByStatusResultType;
    getTaskByStatus: GetTaskByStatusResultType;
}

export class User {
    id: number;
    email: string;
    username: string;
    passwordHash: string;
    firstname?: Nullable<string>;
    lastName?: Nullable<string>;
    createdAt: DateTime;
}

export class CreateUserResultType {
    success: boolean;
    user?: Nullable<User>;
}

export class GetUserResultType {
    success: boolean;
    user?: Nullable<User>;
}

export class GetUsersResultType {
    success: boolean;
    users?: Nullable<User[]>;
}

export class UserMutationType {
    createTask: CreateUserResultType;
    createUser: CreateUserResultType;
}

export class UserQueryType {
    getUser: GetUserResultType;
    getUsers: GetUsersResultType;
}

export abstract class IQuery {
    abstract taskQueries(): TaskQueryType | Promise<TaskQueryType>;

    abstract userQueries(): UserQueryType | Promise<UserQueryType>;
}

export abstract class IMutation {
    abstract taskMutations(): TaskMutationType | Promise<TaskMutationType>;

    abstract userMutations(): UserMutationType | Promise<UserMutationType>;
}

export type DateTime = any;
type Nullable<T> = T | null;
