import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PasswordService } from '../password.service';
import { PrismaService } from "../../../database/prisma.service";
import { JwtService } from '@nestjs/jwt';
import { LoginResultType } from '../models/results/login-token-result';
import { LoginTokenInputType } from '../models/inputs/login-token-input';
import { GetUserResultType, GetUserWithLogsResultType } from '../../users/models/results/get-user-result';
import jwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    @Inject(forwardRef(() => PasswordService))
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email
      }
    });
    if (!user) {
      throw new Error('Вы пытаетесь передать пустой объект');
    }
    const isPassword = await this.passwordService.comparePassword(password, user.passwordHash);
    if (user && isPassword) {
      const { passwordHash, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user: LoginTokenInputType): Promise<LoginResultType> {
    const payload = {email: user.email};
    const token = this.jwtService.sign(payload);
    return {
      token,
      success: true
    }
  }

  async getUserByToken(token: string): Promise<GetUserResultType> {

    if (!token) { return { user: null, success: false } }
    const decoded: any = jwtDecode(token)
    let email = decoded.string;
    const user = await this.prismaService.user.findUnique({
      where: { email }
    });
    if (!user) { return { user: null, success: false } }


    const { passwordHash, ...data } = user;

    return { user: data, success: true }
  }
}