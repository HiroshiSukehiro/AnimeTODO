// import { Task } from "@prisma/client";
import { Args, Int, Mutation, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaService } from "../../../database/prisma.service";
import { User } from "../user";
import { forwardRef, Inject, UsePipes, ValidationPipe } from "@nestjs/common";
import { PasswordService } from "../../../auth/password.service";
import { AuthService } from "../../../auth/auth.service";
import { CreateUserInputType } from "../models/inputs/create-user-input";
import { UserQueryType, UserRootResolver } from "./user-root.resolver";
import { UserService } from "../services/user.service";
import { GetUserInputType } from "../models/inputs/get-user-input";
import { GetUserResultType } from "../models/results/get-user-result";
import { GetUsersResultType } from "../models/results/get-users-result";


@Resolver(UserQueryType)
export class UserQueryResolver extends UserRootResolver {
    constructor(
        private readonly userService: UserService
    ) {
        super()
    }
        
    

    @ResolveField(() => GetUserResultType)
    async getUser(@Args() input: GetUserInputType): Promise<User | null> {
        return await this.userService.getUser(input);
    }

    @ResolveField(() => GetUsersResultType)
    async getUsers(
        @Args('skip', { nullable: true, type: () => Int }) skip: number,
        @Args('take', { nullable: true, type: () => Int }) take: number,
    ): Promise<User[]> {
        return await this.userService.getUsers(null)
    }
}