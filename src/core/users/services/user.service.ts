import { PrismaService } from "../../../database/prisma.service";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { PasswordService } from "../../../auth/password.service";
import { AuthService } from "../../../auth/auth.service";
import { CreateUserInputType } from "../models/inputs/create-user-input";
import { GetUserInputType } from "../models/inputs/get-user-input";
import { GetUsersResultType } from "../models/results/get-users-result";
import { GetUserResultType } from "../models/results/get-user-result";
import { UpdateUserInputType } from "../models/inputs/update-user-input";
import bcrypt from "bcrypt";
import { GetUsersInputType } from "../models/inputs/get-users-input";



@Injectable()
export class UserService {
    constructor (
        private readonly prismaService: PrismaService,
        @Inject(forwardRef(() => PasswordService)) private passwordService: PasswordService,
        private authService: AuthService
    ) {}

    async getUser(input: GetUserInputType): Promise<GetUserResultType> {
        const user = await this.prismaService.user.findUnique({
            where: { id: input.id }
        })
        if (!user) {return {user: null, success: false}}
        const {passwordHash, ...data} = user;
        return {user: data, success: true}
    }

    async getUsers(): Promise<GetUsersResultType> {
        const userList = await this.prismaService.user.findMany();
        let userArr = [];
        for(let i = 0; i < userList.length; i++) {
            const {passwordHash, ...data} = userList[i];
            userArr.push(data);
        }
        return {
            success: true,
            users: userArr
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

    async updateUser(input: UpdateUserInputType) {
        const { email, password, ...data } = input;
        const user = await this.prismaService.user.findFirst({
            where: {
                email
            }
        })

        if(!user) {return {user: null, success: false}}
        const isValid = bcrypt.compareSync(password, user.passwordHash);

        if (isValid) {
            const updatedUser = await this.prismaService.user.update({
                where: {
                    email
                },
                data: {
                    email: input.email,
                    firstname: input.firstname || user.firstname,
                    lastName: input.lastName || user.lastName,
                    username: input.username || user.username
                }
            });
            return { user: updatedUser, success: true }
        } else {
            return { user: user, success: false }
        }
    }
}