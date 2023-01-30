import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '../user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { PrismaModule } from '../../../database/prisma.module';

@Module({
  imports: [
    forwardRef(() => UserModule), 
    PrismaModule,
    PassportModule, 
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '1d' }
    }), 
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, PasswordService],
  exports: [AuthService, PasswordService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}