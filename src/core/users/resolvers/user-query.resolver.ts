import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { UserQueryType, UserRootResolver } from "./user-root.resolver";
import { UserService } from "../services/user.service";
import { GetUserInputType } from "../models/inputs";
import { LoggerMiddleware } from '../../../common/midleware/logger.middleware';
import { GetUsersResultType, GetUserResultType } from "../models/results";

@Resolver(UserQueryType)
export class UserQueryResolver extends UserRootResolver {
    constructor(
        private readonly userService: UserService
    ) {
        super()
    }

    @ResolveField(() => GetUserResultType, { middleware: [LoggerMiddleware] })
    async getUser(@Args() input: GetUserInputType): Promise<GetUserResultType> {
        return await this.userService.getUser(input);
    }

    @ResolveField(() => GetUsersResultType, { middleware: [LoggerMiddleware] })
    async getUsers(): Promise<GetUsersResultType> {
        return await this.userService.getUsers()
    }
}