import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PasswordService } from "../../auth/password.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "../../auth/auth.service";
import { PrismaService } from "../../database/prisma.service";
import { User, UserWithoutPass } from "./user";

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PasswordService))
    private passwordService: PasswordService,
    private authService: AuthService
  ) {}
  
  async CreateUser(input: CreateUserDto): Promise<Object> {
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
      
      let jwtToken = await this.authService.login({login: input.email, password: input.password});

      return {user: user, token: jwtToken.accessToken};
  }

  async GetUser(id: number): Promise<UserWithoutPass | null> {
    const user = await this.prismaService.user.findUnique({where: { id }});
    if(!user) {
      return null;
    }
    const {passwordHash, ...data} = user;
    return data;
  }

  async GetAllUsers(): Promise<UserWithoutPass[]> {
    const users = await this.prismaService.user.findMany();
    let usersArr = [];

    for (let i = 0; i < users.length; i++) {
      const {passwordHash, ...data} = users[i];

      usersArr.push(data);
    }

    return usersArr;
  }
}