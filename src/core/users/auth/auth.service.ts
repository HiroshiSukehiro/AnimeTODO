import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PrismaService } from "../../../database/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService, 
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
}