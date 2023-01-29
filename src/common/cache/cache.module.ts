import { CacheBaseService } from "./services/cache-base.service";
import { Global, Module } from "@nestjs/common";


@Global()
@Module({
    imports: [],
    providers: [CacheBaseService],
    exports: [CacheBaseService]
})
export class CacheModule {}