import { PrismaService } from "../../../database/prisma.service";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { PasswordService } from "../../auth/password.service";
import { CreateUserResultType, DeleteUserResultType, GetUserResultType, GetUsersResultType, GetUserWithLogsResultType, UpdateUserResultType } from "../models/results";
import { UpdateUserInputType, GetUserInputType, CreateUserInputType, DeleteUserInputType } from "../models/inputs";
import bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        @Inject(forwardRef(() => PasswordService)) private passwordService: PasswordService,
        private jwtService: JwtService
    ) { }

    select = {
        email: true,
        username: true,
        firstname: true,
        lastName: true,
        id: true,
        createdAt: true
    }

    async getUser(input: GetUserInputType, cacheGet: Function): Promise<GetUserResultType> {
        const cache = await cacheGet(input.id);

        if (cache) {
            cache.createdAt = cache.createdAt ? new Date(cache.createdAt) : null;
            cache.deleted = cache.deleted ? new Date(cache.deleted) : null;
            return { user: cache, success: true }
        }

        const user = await this.prismaService.user.findUnique({
            where: { id: input.id },   
            select: this.select
        })
        if (!user) { return { user: null, success: false } }
        return { user: user, success: true }
    }

    async getUsers(): Promise<GetUsersResultType> {
        const userList = await this.prismaService.user.findMany({select: this.select});
        return {
            success: true,
            users: userList
        };
    }

    async createUser(input: CreateUserInputType): Promise<CreateUserResultType> {
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

        const payload = { email: user.email };
        const token = this.jwtService.sign(payload)

        return { user: user, success: true, token: token };
    }

    async updateUser(input: UpdateUserInputType): Promise<UpdateUserResultType> {
        const { email, password, ...data } = input;
        const user = await this.prismaService.user.findFirst({
            where: {
                email
            }
        })

        if (!user) { return { user: null, success: false } }
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

    async deleteUser(input: DeleteUserInputType, cacheIn: Function): Promise<DeleteUserResultType> {
        const { password, email } = input;

        const user = await this.prismaService.user.findFirst({
            where: {
                email
            }
        })
        cacheIn(user)
        if (!user) { return { user: null, success: false } }
        const isValid = bcrypt.compareSync(password, user.passwordHash);

        if (isValid) {
            const deletedUser = await this.prismaService.user.delete({
                where: {
                    email
                }
            })

            return { user: deletedUser, success: true }
        } else {
            return { user: user, success: false }
        }
    }

    async getUserInfo(input: GetUserInputType): Promise<GetUserWithLogsResultType> {
        const statisticUser = await this.prismaService.logs.groupBy({
            by: ['userId'],
            _count: {
                userId: true,
            },
            orderBy: {
                _count: {
                    userId: 'desc'
                }
            },
        })
        const [raiting] = statisticUser.map((el, index) => el.userId === input.id && { statisticRang: index + 1, statisticScore: el._count.userId })
        const user = await this.prismaService.user.findUnique({
            where: { id: input.id },
            include: {
                tasks: { take: 20 },
                logs: { take: 20 }, // Ограничение на 20 крайних логов
            },
            
        })
        if (!user) { return { user: null, success: false } }
        let {passwordHash, ...data} = user;
        return { user: { ...data, ...raiting }, success: true }
    }
}