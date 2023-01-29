import { CreateUserResultType } from "../models/results/create-user-result";
import { GetUserResultType } from "../models/results/get-user-result";
import { Field, Mutation, ObjectType, Query, Resolver } from "@nestjs/graphql";
import { GetUsersResultType } from "../models/results/get-users-result";
import { CacheInterceptor } from "../../../common/interceptors/cache-interceptors/cache-interceptors";
import { UseInterceptors } from "@nestjs/common";

@ObjectType()
export class UserMutationType {
    @Field(() => CreateUserResultType, {
        description: 'Create user',
    })
    createTask: CreateUserResultType;
}

@ObjectType()
export class UserQueryType {
    @Field(() => GetUserResultType, {
        description: 'Get user by ID',
    })
    getUser: GetUserResultType;

    @Field(() => GetUserResultType, {
        description: 'Get user list',
    })
    getUsers: GetUsersResultType;
}

@Resolver()
export class UserRootResolver {
    @Mutation(() => UserMutationType, {
        description: 'User mutations',
    })
    userMutations() {
        return {};
    }

    @UseInterceptors(CacheInterceptor)
    @Query(() => UserQueryType, { 
        description: 'User queries' 
    })
    userQueries() {
        return {};
    }
}