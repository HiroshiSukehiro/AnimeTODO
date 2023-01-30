import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { GetUserInputType } from "../../users/models/inputs";
import { GetUserResultType } from "../../users/models/results";
import { LoginQueryType, LoginRootResolver } from "./login-root.resolver";
import { AuthService } from "../services/auth.service";
import { Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

@Resolver(LoginQueryType)
export class LoginQueryResolver extends LoginRootResolver {
    constructor(
        private readonly authService: AuthService
    ) {
        super();
    }

    @UseGuards(JwtAuthGuard)
    @ResolveField(() => GetUserResultType)
    async getUserByToken(@Req() input: Request): Promise<GetUserResultType> {
        return await this.authService.getUserByToken(input);
    }
}