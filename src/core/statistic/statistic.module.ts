import { StatisticService } from './services/statistic.service';
import { StatisticQueryResolver } from "./resolvers/statistic-query.resolver"
import { StatisticRootResolver } from "./resolvers/statistic-root.resolver"
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [],
    providers: [
        StatisticService,
        StatisticRootResolver,
        StatisticQueryResolver
    ],
})
export class StatisticModule { }
