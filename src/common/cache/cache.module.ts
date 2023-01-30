import { CacheBaseService } from "./services/cache-base.service";
import { Global, Module } from "@nestjs/common";
import { PrismaModule } from "../../database/prisma.module";
import { CacheDBService } from "./services/cache-db.service";

@Global()
@Module({
    imports: [PrismaModule],
    providers: [CacheBaseService, CacheDBService],
    exports: [CacheDBService]
})
export class CacheModule {}