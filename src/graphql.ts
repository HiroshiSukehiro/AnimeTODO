
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

export class StatisticUser {
    count: number;
    userId: number;
}

export class GetStatisticResultType {
    success: boolean;
    errors?: Nullable<string[]>;
    statistic?: Nullable<StatisticUser[]>;
}

export class StatisticMutationType {
    deleteStatistic: GetStatisticResultType;
}

export class StatisticQueryType {
    getStatistic: GetStatisticResultType;
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
    errors?: Nullable<string[]>;
    task?: Nullable<Task>;
}

export class GetTaskResultType {
    success: boolean;
    errors?: Nullable<string[]>;
    task?: Nullable<Task>;
}

export class GetTasksResultType {
    success: boolean;
    errors?: Nullable<string[]>;
    tasks?: Nullable<Task[]>;
}

export class GetTasksByStatusResultType {
    success: boolean;
    errors?: Nullable<string[]>;
    task?: Nullable<Task[]>;
}

export class EditTaskResultType {
    success: boolean;
    errors?: Nullable<string[]>;
    task?: Nullable<Task>;
}

export class DeleteTaskResultType {
    success: boolean;
    errors?: Nullable<string[]>;
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
    getTasksByStatus: GetTasksByStatusResultType;
    getTaskByStatus: GetTasksByStatusResultType;
}

export class LoginResultType {
    success: boolean;
    errors?: Nullable<string[]>;
    token?: Nullable<string>;
}

export class Log {
    id: number;
    userId: number;
    message?: Nullable<string>;
    args?: Nullable<string>;
    sourse?: Nullable<string>;
    createdAt: DateTime;
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

export class UserWithLogs {
    id: number;
    email: string;
    username: string;
    firstname?: Nullable<string>;
    lastName?: Nullable<string>;
    createdAt: DateTime;
    tasks?: Nullable<Task[]>;
    logs?: Nullable<Log[]>;
}

export class CreateUserResultType {
    success: boolean;
    errors?: Nullable<string[]>;
    user?: Nullable<User>;
    token: string;
}

export class DeleteUserResultType {
    success: boolean;
    errors?: Nullable<string[]>;
    user?: Nullable<User>;
}

export class GetUserResultType {
    success: boolean;
    errors?: Nullable<string[]>;
    user?: Nullable<UserWithoutPass>;
}

export class GetUserWithLogsResultType {
    success: boolean;
    errors?: Nullable<string[]>;
    user?: Nullable<UserWithLogs>;
}

export class GetUsersResultType {
    success: boolean;
    errors?: Nullable<string[]>;
    users?: Nullable<UserWithoutPass[]>;
}

export class UpdateUserResultType {
    success: boolean;
    errors?: Nullable<string[]>;
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
    getUserInfo: GetUserWithLogsResultType;
}

export abstract class IQuery {
    abstract StatisticQueries(): StatisticQueryType | Promise<StatisticQueryType>;

    abstract taskQueries(): TaskQueryType | Promise<TaskQueryType>;

    abstract userQueries(): UserQueryType | Promise<UserQueryType>;

    abstract loginQueries(): LoginQueryType | Promise<LoginQueryType>;
}

export abstract class IMutation {
    abstract StatisticMutations(): StatisticMutationType | Promise<StatisticMutationType>;

    abstract taskMutations(): TaskMutationType | Promise<TaskMutationType>;

    abstract userMutations(): UserMutationType | Promise<UserMutationType>;

    abstract loginMutations(): LoginMutationType | Promise<LoginMutationType>;
}

export type DateTime = any;
type Nullable<T> = T | null;
