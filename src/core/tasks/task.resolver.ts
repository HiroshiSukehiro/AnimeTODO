import { PrismaService } from "../../database/prisma.service";
import { Injectable } from "@nestjs/common";
import { Task } from "@prisma/client";
import { NewTask, UpdateTask, IQuery } from "graphql";
import { Query } from "@nestjs/graphql";


@Injectable()
export class TaskResolver {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    @Query()
    async task(id: string): Promise<Task | null> {
        return await this.prismaService.task.findUnique({
            where: {
                id: +id
            }
        });
    }

    async tasks(where: Task): Promise<Task[] | null> {
        return await this.prismaService.task.findMany({
            where
        });
    }

    async createTask(input: NewTask) {
        // return await this.prismaService.task.create({
        //     data: {
                
        //     }
        // });
    }
    
    async updateTask(input: UpdateTask) {
        const {id, description, expires, isCompleted, name, status} = input;
        return await this.prismaService.task.update({
            where: {
                id: +id
            },
            data: {
                ...(description && {description}),
                ...(expires && {expires}),
                ...(isCompleted && {isCompleted}),
                ...(name && {name}),
                ...(status && {status}),
            }
        })
    }
}