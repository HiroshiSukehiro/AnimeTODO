import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma.module';
import { TaskMutationResolver } from './resolvers/task-mutation.resolver';
import { TaskQueryResolver } from './resolvers/task-query.resolver';
import { TaskRootResolver } from './resolvers/task-root.resolver';
import { TaskService, ValidationTaskService } from './services';

@Module({
    imports: [PrismaModule],
    controllers: [],
    providers: [
        TaskRootResolver, 
        TaskQueryResolver, 
        TaskMutationResolver,
        TaskService,
        ValidationTaskService
    ],
    exports: []
})
export class TaskModule {}