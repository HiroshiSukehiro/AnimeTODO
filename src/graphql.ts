
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
    authorId: string;
    name: string;
    description: string;
    expires: string;
    isCompleted: boolean;
    status: TaskStateEnum;
}

export class UpdateTask {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    expires?: Nullable<string>;
    isCompleted?: Nullable<boolean>;
    status?: Nullable<TaskStateEnum>;
}

export class Task {
    id: string;
    authorId: string;
    name: string;
    description?: Nullable<string>;
    expires: string;
    isCompleted: boolean;
    status: TaskStateEnum;
    createdAt: string;
    updatedAt?: Nullable<string>;
    author?: Nullable<string>;
}

export abstract class IQuery {
    abstract tasks(): Task[] | Promise<Task[]>;

    abstract task(id: string): Nullable<Task> | Promise<Nullable<Task>>;
}

export abstract class IMutation {
    abstract createTask(input?: Nullable<NewTask>): Nullable<Task> | Promise<Nullable<Task>>;

    abstract updateTask(input?: Nullable<UpdateTask>): Nullable<Task> | Promise<Nullable<Task>>;

    abstract deleteTask(input?: Nullable<string>): Nullable<Task> | Promise<Nullable<Task>>;
}

type Nullable<T> = T | null;
