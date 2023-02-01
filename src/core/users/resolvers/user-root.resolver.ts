import { Field, Mutation, ObjectType, Query, Resolver } from "@nestjs/graphql";
import { UpdateUserResultType, DeleteUserResultType, GetUsersResultType, GetUserResultType, CreateUserResultType, GetUserWithLogsResultType } from "../models/results";
import { CacheQuery } from "../../../common/decorators/cache-query.decorator";
import { CacheMutation } from "../../../common/decorators/cache-mutation.decorator";

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

    @Field(() => DeleteUserResultType, {
        description: 'Delete user',
    })
    deleteUser: DeleteUserResultType;
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

    @Field(() => GetUserWithLogsResultType, {
        description: 'Get user Info',
    })
    getUserInfo: GetUserWithLogsResultType;
}

@Resolver()
export class UserRootResolver {
    @CacheMutation({type: 'user'})
    @Mutation(() => UserMutationType, {
        description: 'User mutations',
    })
    userMutations() {
        return {};
    }

    @CacheQuery({type: 'user'})
    @Query(() => UserQueryType, { 
        description: 'User queries' 
    })
    userQueries() {
        return {};
    }
}