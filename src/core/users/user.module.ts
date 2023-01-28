import { UserResolver } from "./user.resolver";
import { Module } from "@nestjs/common";
import { PrismaModule } from "../../database/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [],
    providers: [UserResolver],
    exports: []
})
export class UserModule {}