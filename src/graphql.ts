
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
    author: string;
}

export abstract class IQuery {
    abstract tasks(): Nullable<Task[]> | Promise<Nullable<Task[]>>;

    abstract task(id: number): Nullable<Task> | Promise<Nullable<Task>>;
}

export abstract class IMutation {
    abstract createTask(input?: Nullable<NewTask>): Nullable<Task> | Promise<Nullable<Task>>;

    abstract updateTask(input?: Nullable<UpdateTask>): Nullable<Task> | Promise<Nullable<Task>>;

    abstract deleteTask(input?: Nullable<string>): Nullable<Task> | Promise<Nullable<Task>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
