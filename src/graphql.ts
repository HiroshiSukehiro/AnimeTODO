
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum TaskStateEnum {
    PENDING = "PENDING",
    IN_WORK = "IN_WORK",
    COMPLETED = "COMPLETED"
}

export class NewTask {
    authorId: number;
    name: string;
    description: string;
    expires: DateTime;
    isCompleted: boolean;
    status: TaskStateEnum;
}

export class UpdateTask {
    id: number;
    name?: Nullable<string>;
    description?: Nullable<string>;
    expires?: Nullable<string>;
    isCompleted?: Nullable<boolean>;
    status?: Nullable<TaskStateEnum>;
}

export class NewUser {
    email: string;
    username: string;
    password: string;
    firstname?: Nullable<string>;
    lastName?: Nullable<string>;
}

export class UpdateUser {
    id: number;
    email?: Nullable<string>;
    username?: Nullable<string>;
    passwordHash?: Nullable<string>;
    firstname?: Nullable<string>;
    lastName?: Nullable<string>;
}

export class Task {
    id: number;
    authorId: number;
    name: string;
    description?: Nullable<string>;
    expires: DateTime;
    isCompleted: boolean;
    status: TaskStateEnum;
    createdAt: DateTime;
    updatedAt?: Nullable<DateTime>;
    deleted?: Nullable<boolean>;
    author: User;
}

export abstract class IQuery {
    abstract tasks(): Nullable<Task[]> | Promise<Nullable<Task[]>>;

    abstract task(id: number): Nullable<Task> | Promise<Nullable<Task>>;

    abstract users(): Nullable<User[]> | Promise<Nullable<User[]>>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createTask(input: NewTask): Nullable<Task> | Promise<Nullable<Task>>;

    abstract updateTask(input: UpdateTask): Nullable<Task> | Promise<Nullable<Task>>;

    abstract deleteTask(input: number): Nullable<Task> | Promise<Nullable<Task>>;

    abstract createUser(input: NewUser): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(input: UpdateUser): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(input: number): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    id: number;
    email?: Nullable<string>;
    username?: Nullable<string>;
    passwordHash?: Nullable<string>;
    firstname?: Nullable<string>;
    lastName?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    deleted?: Nullable<DateTime>;
}

export type DateTime = any;
type Nullable<T> = T | null;
