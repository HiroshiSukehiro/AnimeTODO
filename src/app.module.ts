import { StatisticModule } from './core/statistic/statistic.module';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from './database/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { TaskModule } from './core/tasks/task.module';
import { UserModule } from './core/users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from './common/cache/cache.module';
import { AuthModule } from './core/auth/auth.module';
import { AuthMiddleware } from './common/midleware/auth.middleware';
@Module({
  imports: [
    StatisticModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class'
      },
      buildSchemaOptions: {
        fieldMiddleware: [AuthMiddleware],
      },
    }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get('REDIS_PORT')
        }
      })
    }),
    CacheModule,
    TaskModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {

}
