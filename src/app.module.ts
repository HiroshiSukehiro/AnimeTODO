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

@Module({
  imports: [ 
    PrismaModule,
    ConfigModule.forRoot({isGlobal: true}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class'
      },
      // buildSchemaOptions: {
      //   fieldMiddleware: [LoggerMiddleware],
      // },
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
    UserModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  
}
