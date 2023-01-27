import { TaskResolver } from "./task.resolver";
import { Module } from "@nestjs/common";
import { PrismaModule } from "../../database/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [],
    providers: [TaskResolver],
    exports: []
})
export class TaskModule {}