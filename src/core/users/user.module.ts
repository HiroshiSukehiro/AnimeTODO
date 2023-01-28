import { PrismaModule } from '../../database/prisma.module';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../../auth/auth.service';
import { AuthModule } from '../../auth/auth.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '120s' }
    }), 
  ],
  providers: [ AuthService, UserResolver],
  exports: [],
  controllers: []
})
export class UserModule {}