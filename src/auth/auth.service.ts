import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IPayload } from './context/types';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService, 
    private jwtService: JwtService,
    @Inject(forwardRef(() => PasswordService))
    private passwordService: PasswordService
  ) {}
  
  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email
      }
    });
    if(!user) {
      throw new Error('Вы пытаетесь передать пустой объект');
    }
    const isPassword = await this.passwordService.comparePassword(password, user.passwordHash);
    if(user && isPassword) {
      const { passwordHash, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user: any) {
    const payload: IPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    return {
        accessToken: this.jwtService.sign(payload),
    };
  }
}