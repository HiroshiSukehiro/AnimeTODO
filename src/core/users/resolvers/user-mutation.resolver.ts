import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { CreateUserInputType, DeleteUserInputType, LoginUserInputType, UpdateUserInputType } from "../models/inputs";
import { UserMutationType, UserRootResolver } from "../resolvers/user-root.resolver";
import { UpdateUserResultType, CreateUserResultType, DeleteUserResultType, LoginUserResultType } from "../models/results";
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

    @ResolveField(() => DeleteUserResultType)
    async deleteUser(@Args() input: DeleteUserInputType): Promise<DeleteUserResultType> {
        return await this.userService.deleteUser(input);
    }

    @ResolveField(() => LoginUserResultType)
    async login(@Args() input: LoginUserInputType): Promise<LoginUserResultType> {
        return await this.userService.login(input);
    }
}
