import { TaskResolver } from "./task.resolver";
import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { PrismaModule } from "../../database/prisma.module";




@Module({
    imports: [PrismaModule],
    controllers: [],
    providers: [TaskResolver],
    exports: [TaskResolver]
})
export class TaskModule {}