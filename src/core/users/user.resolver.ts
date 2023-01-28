// import { Task } from "@prisma/client";
import { NewTask, UpdateTask, IQuery } from "graphql";
import { Args, Context, Query, ResolveField, Resolver, Root } from "@nestjs/graphql";
import { PrismaService } from "../../database/prisma.service";
import { User } from "./user";


@Resolver(User)
export class UserResolver {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    @Query(() => User, { nullable: true })
    user(@Args('id') id: number) {
        return this.prismaService.user.findUnique({
            where: { id }
        })
    }

    @Query(() => [User])
    users(
        @Args('skip', { nullable: true }) skip: number,
        @Args('take', { nullable: true }) take: number,
        @Context() ctx: any,
    ) {
        console.log('User ctx', ctx);
            
        return this.prismaService.user.findMany({
            where: {
                
            }
        })
    }
}