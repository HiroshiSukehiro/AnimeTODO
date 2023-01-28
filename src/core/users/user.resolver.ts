// import { Task } from "@prisma/client";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "../../database/prisma.service";
import { User } from "./user";
import { forwardRef, Inject, UsePipes, ValidationPipe } from "@nestjs/common";
import { PasswordService } from "../../auth/password.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "../../auth/auth.service";


@Resolver(User)
export class UserResolver {
    constructor(
        private readonly prismaService: PrismaService,
        @Inject(forwardRef(() => PasswordService))
        private passwordService: PasswordService,
        private authService: AuthService
    ) {}
        
    @Mutation(() => User)
    async createUser(@Args('input') input: CreateUserDto): Promise<Object> {
        const encryptedPassword = await this.passwordService.hashPassword(
          input.password,
        );
        
        const user = await this.prismaService.user.create({
            data: {
                email: input.email,
                username: input.username,
                passwordHash: encryptedPassword,
                firstname: input.firstname,
                lastName: input.lastName,
                createdAt: new Date
            }
        })
        
        let jwtToken = await this.authService.login({login: input.email, password: input.password});

        return {user: user, token: jwtToken.accessToken};
    }

    @Query(() => User)
    async getUser(@Args('id') id: number): Promise<User | null> {
        return await this.prismaService.user.findUnique({
            where: { id }
        })
    }

    @Query(() => [User])
    async getAllUsers(): Promise<User[]> {
        return await this.prismaService.user.findMany();
    }
}