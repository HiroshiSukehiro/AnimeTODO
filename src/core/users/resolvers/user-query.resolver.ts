import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { UserQueryType, UserRootResolver } from "./user-root.resolver";
import { UserService } from "../services/user.service";
import { GetUserInputType } from "../models/inputs";
import { CheckAuthMiddleware, LoggerMiddleware } from '../../../common/midleware';
import { GetUsersResultType, GetUserResultType, GetUserWithLogsResultType } from "../models/results";

@Resolver(UserQueryType)
export class UserQueryResolver extends UserRootResolver {
    constructor(
        private readonly userService: UserService
    ) {
        super()
    }

    @ResolveField(() => GetUserResultType, { middleware: [LoggerMiddleware, CheckAuthMiddleware] })
    async getUser(@Args() input: GetUserInputType): Promise<GetUserResultType> {
        return await this.userService.getUser(input)
    }

    @ResolveField(() => GetUsersResultType, { middleware: [LoggerMiddleware, CheckAuthMiddleware] })
    async getUsers(): Promise<GetUsersResultType> {
        return await this.userService.getUsers()
    }
    
    @ResolveField(() => GetUserWithLogsResultType, { middleware: [LoggerMiddleware, CheckAuthMiddleware] })
    async getUserInfo(@Args() input: GetUserInputType): Promise<GetUserWithLogsResultType> {
        return await this.userService.getUserInfo(input)
    }
}