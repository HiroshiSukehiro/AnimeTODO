import { TaskQueryResolver } from "./resolvers/task-query.resolver";
import { Module } from "@nestjs/common";
import { PrismaModule } from "../../database/prisma.module";
import { TaskMutationResolver } from "./resolvers/task-mutation.resolver";
import { TaskRootResolver } from "./resolvers/task-root.resolver";
import { TaskService } from "./services/task.service";

@Module({
    imports: [PrismaModule],
    controllers: [],
    providers: [
        TaskRootResolver, 
        TaskQueryResolver, 
        TaskMutationResolver,
        TaskService
    ],
    exports: []
})
export class TaskModule {}