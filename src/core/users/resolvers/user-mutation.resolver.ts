
import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { CreateUserInputType } from "../models/inputs/create-user-input";
import { CreateUserResultType } from "../models/results/create-user-result";
import { UserMutationType, UserRootResolver } from "../resolvers/user-root.resolver";

import { UserService } from "../services/user.service";



@Resolver(UserMutationType)
export class UserMutationResolver extends UserRootResolver {
    constructor(
        private readonly userService: UserService
    ) {
        super();
    }

    @ResolveField(() => CreateUserResultType)
    async createUser(@Args() input: CreateUserInputType): Promise<any> {
        return await this.userService.createUser(input)
    }

}