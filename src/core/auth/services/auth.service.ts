import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PasswordService } from '../password.service';
import { PrismaService } from "../../../database/prisma.service";
import { User } from '../../users/user';
import { JwtService } from '@nestjs/jwt';
import { LoginResultType } from '../models/results/login-token-result';
import { LoginTokenInputType } from '../models/inputs/login-token-input';
import { GetUserResultType } from '../../users/models/results/get-user-result';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService, 
    @Inject(forwardRef(() => PasswordService))
    private passwordService: PasswordService,
    private jwtService: JwtService
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

  async login(user: LoginTokenInputType): Promise<LoginResultType> {
    const payload = { email: user.email };
    return {
      token: this.jwtService.sign(payload), 
      success: true
    }
  }

  async getUserByToken(req: any): Promise<GetUserResultType> {
    if (!req) {return {user: null, success: false}}
    let email = req.email;
    const user = await this.prismaService.user.findFirst({
      where: {email}
    });
    if(!user) {return {user: null, success: false}}

    const {passwordHash, ...data} = user;

    return {user: data, success: true}
  }
}