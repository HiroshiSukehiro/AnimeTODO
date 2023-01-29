import { UpdateUserInputType } from "../models/inputs/update-user-input";
import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { CreateUserInputType } from "../models/inputs/create-user-input";
import { CreateUserResultType } from "../models/results/create-user-result";
import { UserMutationType, UserRootResolver } from "../resolvers/user-root.resolver";
import { UpdateUserResultType } from "../models/results/update-user-result";

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

    @ResolveField(() => UpdateUserResultType)
    async updateUser(@Args() input: UpdateUserInputType): Promise<UpdateUserResultType> {
        return await this.userService.updateUser(input);
    }
}
