import { LoggerService } from './services/statistic.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [],
    providers: [
        LoggerService,],
})
export class LoggerModule { }
