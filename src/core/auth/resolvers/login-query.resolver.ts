import { ResolveField, Resolver } from "@nestjs/graphql";
import { GetUserResultType } from "../../users/models/results";
import { LoginQueryType, LoginRootResolver } from "./login-root.resolver";
import { AuthService } from "../services/auth.service";
import { GraphqlAuthUser } from "../services/GraphqlAuthUser";
import { GraphqlUserInterceptor } from "../services/GraphqlIntenceptor";
import { UseInterceptors } from "@nestjs/common";

@Resolver(LoginQueryType)
export class LoginQueryResolver extends LoginRootResolver {
    constructor(
        private readonly authService: AuthService
    ) {
        super();
    }

    @ResolveField(() => GetUserResultType)
    @UseInterceptors(GraphqlUserInterceptor)
    async getUserByToken(@GraphqlAuthUser() req: any): Promise<GetUserResultType> {
        return await this.authService.getUserByToken(req.header('authorization'));
    }
}