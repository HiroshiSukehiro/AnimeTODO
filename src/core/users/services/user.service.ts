import { PrismaService } from "../../../database/prisma.service";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { PasswordService } from "../../../auth/password.service";
import { AuthService } from "../../../auth/auth.service";
import { CreateUserInputType } from "../models/inputs/create-user-input";
import { User } from "../user";
import { GetUsersResultType } from "../models/results/get-users-result";


@Injectable()
export class UserService {
    constructor (
        private readonly prismaService: PrismaService,
        @Inject(forwardRef(() => PasswordService)) private passwordService: PasswordService,
        private authService: AuthService
    ) {}

    async getUser(input: any) {
        const user = await this.prismaService.user.findUnique({
            where: { id: input.id }
        })
        return {user: user, success: true}
    }

    async getUsers(): Promise<GetUsersResultType> {
        const userList = await this.prismaService.user.findMany();
        console.log(userList)
        return {
            success: true,
            users: userList
        };
    }

    async createUser(input: CreateUserInputType) {
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
              createdAt: new Date()
            }
          })
      
        return {user: user, success: true};
    }
}