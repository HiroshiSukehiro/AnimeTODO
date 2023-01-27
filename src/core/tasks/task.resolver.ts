// import { Task } from "@prisma/client";
import { NewTask, UpdateTask, IQuery, Task } from "graphql";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { TaskService } from "./task.service";
import { PrismaService } from "../../database/prisma.service";


@Resolver(() => Task)
export class TaskResolver {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    // @Query(() => [Task])
    // async posts(@Args() args: string) {
    //     // return this.prismaService.
    // }


}