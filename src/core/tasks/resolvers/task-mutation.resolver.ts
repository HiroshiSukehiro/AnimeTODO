import { PrismaService } from "../../../database/prisma.service";
import { Args, Field, ObjectType, ResolveField, Resolver } from "@nestjs/graphql";
import { CreateTaskInputType } from "../models/inputs/create-task-input";
import { CreateTaskResultType } from "../models/results/create-task-result";
import { TaskMutationType, TaskRootResolver } from "../resolvers/task-root.resolver";



@Resolver(TaskMutationType)
export class TaskMutationResolver extends TaskRootResolver {
    constructor(
        private readonly prismaService: PrismaService
    ) {
        super();
    }

    @ResolveField(() => CreateTaskResultType)
    createTask(@Args() input: CreateTaskInputType) {
        // return this.prismaService.task.findUnique({
        //     where: { id }
        // })
    }

}