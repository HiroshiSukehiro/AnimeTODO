import { LoginResultType } from "../models/results/login-token-result";
import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthService } from "../services/auth.service";
import { LoginMutationType, LoginRootResolver } from "./login-root.resolver";
import { LoginTokenInputType } from "../models/inputs/login-token-input";
import { Req, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { Request } from "express";

@Resolver(LoginMutationType)
export class LoginMutationResolver extends LoginRootResolver {
    constructor(
        private readonly authService: AuthService
    ) {
        super();
    }

    @UseGuards(LocalAuthGuard)
    @ResolveField(() => LoginResultType)
    async login(@Req() req: Request, @Args() input: LoginTokenInputType): Promise<LoginResultType> {
        return await this.authService.login(input);
    }
}
