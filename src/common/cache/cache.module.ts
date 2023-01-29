import { CacheBaseService } from "./services/cache-base.service";
import { Global, Module } from "@nestjs/common";
import { PrismaModule } from "../../database/prisma.module";

@Global()
@Module({
    imports: [PrismaModule],
    providers: [CacheBaseService],
    exports: [CacheBaseService]
})
export class CacheModule {}