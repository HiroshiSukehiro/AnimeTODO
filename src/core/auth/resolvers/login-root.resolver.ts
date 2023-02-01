import { Field, Mutation, ObjectType, Query, Resolver } from "@nestjs/graphql";
import { GetUserResultType, } from "../../users/models/results";
import { LoginResultType } from "../models/results/login-token-result";

@ObjectType()
export class LoginMutationType {
    @Field(() => LoginResultType, {
        description: 'Login',
    })
    login: LoginResultType;
}

@ObjectType()
export class LoginQueryType {
    @Field(() => GetUserResultType, {
        description: 'Get user by token',
    })
    getUserByToken: GetUserResultType;
}

@Resolver()
export class LoginRootResolver {
    @Mutation(() => LoginMutationType, {
        description: 'login mutations',
    })
    loginMutations() {
        return {};
    }

    @Query(() => LoginQueryType, { 
        description: 'Login queries' 
    })
    loginQueries() {
        return {};
    }
}