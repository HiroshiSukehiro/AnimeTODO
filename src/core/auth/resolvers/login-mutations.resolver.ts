import { LoginResultType } from "../models/results/login-token-result";
import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthService } from "../services/auth.service";
import { LoginMutationType, LoginRootResolver } from "./login-root.resolver";
import { LoginTokenInputType } from "../models/inputs/login-token-input";
import { UseGuards } from "@nestjs/common";

@Resolver(LoginMutationType)
export class LoginMutationResolver extends LoginRootResolver {
    constructor(
        private readonly authService: AuthService
    ) {
        super();
    }

    @UseGuards()
    @ResolveField(() => LoginResultType)
    async login(@Args() input: LoginTokenInputType): Promise<LoginResultType> {
        return await this.authService.login(input);
    }
}
