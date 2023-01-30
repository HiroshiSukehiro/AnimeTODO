import { Field, Mutation, ObjectType, Query, Resolver } from "@nestjs/graphql";
import { CacheInterceptor, ReqType } from "../../../common/interceptors/cache-interceptor/cache-interceptor";
import { UseInterceptors } from "@nestjs/common";
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

    @ReqType({query: 'user'})
    @UseInterceptors(CacheInterceptor)
    @Query(() => LoginQueryType, { 
        description: 'Login queries' 
    })
    loginQueries() {
        return {};
    }
}