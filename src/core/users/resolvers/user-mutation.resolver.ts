import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { CreateUserInputType, DeleteUserInputType, UpdateUserInputType } from "../models/inputs";
import { UserMutationType, UserRootResolver } from "../resolvers/user-root.resolver";
import { UpdateUserResultType, CreateUserResultType, DeleteUserResultType } from "../models/results";
import { CheckAuthMiddleware, LoggerMiddleware } from '../../../common/midleware';
import { UserService } from "../services/user.service";

@Resolver(UserMutationType)
export class UserMutationResolver extends UserRootResolver {
    constructor(
        private readonly userService: UserService
    ) {
        super();
    }

    @ResolveField(() => CreateUserResultType, { middleware: [LoggerMiddleware] })
    async createUser(@Args() input: CreateUserInputType): Promise<any> {
        return await this.userService.createUser(input)
    }

    @ResolveField(() => UpdateUserResultType, { middleware: [ CheckAuthMiddleware] })
    async updateUser(@Args() input: UpdateUserInputType): Promise<UpdateUserResultType> {
        return await this.userService.updateUser(input);
    }

    @ResolveField(() => DeleteUserResultType, { middleware: [ CheckAuthMiddleware] })
    async deleteUser(@Args() input: DeleteUserInputType): Promise<DeleteUserResultType> {
        return await this.userService.deleteUser(input);
    }
}
