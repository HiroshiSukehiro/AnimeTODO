import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '../users/user.module';
import { AuthService } from './services/auth.service';
import { PasswordService } from './password.service';
import { PrismaModule } from '../../database/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginMutationResolver } from './resolvers/login-mutations.resolver';
import { LoginRootResolver } from './resolvers/login-root.resolver'
import { LoginQueryResolver } from './resolvers/login-query.resolver';

@Module({
  imports: [
    forwardRef(() => UserModule), 
    PrismaModule,
    PassportModule, 
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, PasswordService, LoginMutationResolver, LoginRootResolver, LoginQueryResolver],
  exports: [AuthService, PasswordService, LocalStrategy],
  controllers: []
})
export class AuthModule {}