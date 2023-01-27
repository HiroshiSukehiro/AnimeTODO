// import { Task } from "@prisma/client";
import { NewTask, UpdateTask, IQuery } from "graphql";
import { Args, Context, Query, ResolveField, Resolver, Root } from "@nestjs/graphql";
import { PrismaService } from "../../database/prisma.service";
import { Task } from "./task";


@Resolver(Task)
export class TaskResolver {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    // @ResolveField()
    // async ta(@Root() task: Task): Promise<undefined | null> {
    //     return;
    // }

    @Query(() => Task, { nullable: true })
    task(@Args('id') id: number) {
        return this.prismaService.task.findUnique({
            where: { id }
        })
    }

    @Query(() => [Task])
    tasks(
        @Args('authorId', { nullable: true }) authorId: number,
        @Args('skip', { nullable: true }) skip: number,
        @Args('take', { nullable: true }) take: number,
        @Context() ctx: any,
    ) {
        console.log('Tasks ctx', ctx);
            
        return this.prismaService.task.findMany({
            where: {
                
            }
        })
    }
}