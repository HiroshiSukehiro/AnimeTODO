
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
    task?: Nullable<Task>;
}

export class GetTasksResultType {
    success: boolean;
    tasks?: Nullable<Task[]>;
}

export class GetTaskByStatusResultType {
    success: boolean;
    task?: Nullable<Task[]>;
}

export class EditTaskResultType {
    success: boolean;
    task?: Nullable<Task>;
}

export class DeleteTaskResultType {
    success: boolean;
    task?: Nullable<Task>;
}

export class TaskMutationType {
    createTask: CreateTaskResultType;
    editTask: EditTaskResultType;
    deleteTask: DeleteTaskResultType;
}

export class TaskQueryType {
    getTask: GetTaskResultType;
    getTasks: GetTasksResultType;
    getTasksByStatus: GetTaskByStatusResultType;
    getTaskByStatus: GetTaskByStatusResultType;
}

export class LoginResultType {
    success: boolean;
    token?: Nullable<string>;
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

export class UserWithoutPass {
    id: number;
    email: string;
    username: string;
    firstname?: Nullable<string>;
    lastName?: Nullable<string>;
    createdAt: DateTime;
}

export class CreateUserResultType {
    success: boolean;
    user?: Nullable<User>;
    token: string;
}

export class DeleteUserResultType {
    success: boolean;
    user?: Nullable<User>;
}

export class GetUserResultType {
    success: boolean;
    user?: Nullable<UserWithoutPass>;
}

export class GetUsersResultType {
    success: boolean;
    users?: Nullable<UserWithoutPass[]>;
}

export class UpdateUserResultType {
    success: boolean;
    user?: Nullable<UserWithoutPass>;
}

export class LoginMutationType {
    login: LoginResultType;
}

export class LoginQueryType {
    getUserByToken: GetUserResultType;
}

export class UserMutationType {
    createUser: CreateUserResultType;
    updateUser: UpdateUserResultType;
    deleteUser: DeleteUserResultType;
}

export class UserQueryType {
    getUser: GetUserResultType;
    getUsers: GetUsersResultType;
}

export abstract class IQuery {
    abstract taskQueries(): TaskQueryType | Promise<TaskQueryType>;

    abstract userQueries(): UserQueryType | Promise<UserQueryType>;

    abstract loginQueries(): LoginQueryType | Promise<LoginQueryType>;
}

export abstract class IMutation {
    abstract taskMutations(): TaskMutationType | Promise<TaskMutationType>;

    abstract userMutations(): UserMutationType | Promise<UserMutationType>;

    abstract loginMutations(): LoginMutationType | Promise<LoginMutationType>;
}

export type DateTime = any;
type Nullable<T> = T | null;
