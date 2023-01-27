import { PrismaModule } from './database/prisma.module';
import { Module } from '@nestjs/common';
import { TaskModule } from './core/tasks/task.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class'
      },
    }),
    TaskModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
