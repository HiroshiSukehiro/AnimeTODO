import { PrismaService } from "../../../database/prisma.service";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { PasswordService } from "../../../auth/password.service";
import { AuthService } from "../../../auth/auth.service";
import { CreateUserInputType } from "../models/inputs/create-user-input";


@Injectable()
export class UserService {
    constructor (
        private readonly prismaService: PrismaService,
        @Inject(forwardRef(() => PasswordService)) private passwordService: PasswordService,
        private authService: AuthService
    ) {}

    async getUser(input: any) {
        return await this.prismaService.user.findUnique({
            where: { id: input.id }
        })
    }

    async getUsers(input: any) {
        return await this.prismaService.user.findMany({
            where: {}
        })
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