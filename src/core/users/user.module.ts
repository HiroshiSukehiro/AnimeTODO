import { PrismaModule } from '../../database/prisma.module';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserQueryResolver } from './resolvers/user-query.resolver';
import { UserService } from './services/user.service';
import { UserMutationResolver } from './resolvers/user-mutation.resolver';
import { UserRootResolver } from './resolvers/user-root.resolver';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '1d' }
    }), 
  ],
  providers: [ 
    AuthService,
    UserService,
    UserQueryResolver,
    UserMutationResolver,
    UserRootResolver
  ],
  exports: [],
  controllers: []
})
export class UserModule {}