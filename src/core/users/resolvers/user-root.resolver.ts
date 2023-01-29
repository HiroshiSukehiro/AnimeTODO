import { CreateUserResultType } from "../models/results/create-user-result";
import { GetUserResultType } from "../models/results/get-user-result";
import { Field, Mutation, ObjectType, Query, Resolver } from "@nestjs/graphql";
import { GetUsersResultType } from "../models/results/get-users-result";
import { CacheInterceptor, ReqType } from "../../../common/interceptors/cache-interceptor/cache-interceptor";
import { UseInterceptors } from "@nestjs/common";
import { UpdateUserResultType } from "../models/results/update-user-result";

@ObjectType()
export class UserMutationType {
    @Field(() => CreateUserResultType, {
        description: 'Create user',
    })
    createUser: CreateUserResultType;

    @Field(() => UpdateUserResultType, {
        description: 'Update user',
    })
    updateUser: UpdateUserResultType;
}

@ObjectType()
export class UserQueryType {
    @Field(() => GetUserResultType, {
        description: 'Get user by ID',
    })
    getUser: GetUserResultType;

    @Field(() => GetUsersResultType, {
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

    @ReqType({query: 'user'})
    @UseInterceptors(CacheInterceptor)
    @Query(() => UserQueryType, { 
        description: 'User queries' 
    })
    userQueries() {
        return {};
    }
}