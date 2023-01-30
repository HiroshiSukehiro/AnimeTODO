/*
https://docs.nestjs.com/modules
*/
import { PrismaModule } from '../../database/prisma.module';
import { LoggingService } from './services/logging.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [PrismaModule],
    controllers: [],
    providers: [LoggingService],
    exports:[LoggingService]
})
export class LoggingModule {}
