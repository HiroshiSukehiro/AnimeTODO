import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { CheckAuthMiddleware } from '../../../common/midleware';
import { StatisticService } from '../services/statistic.service';
import { GetStatisticResultType } from "../models/results/get-statistic-user-result"
import { StatisticQueryType, StatisticRootResolver } from "./statistic-root.resolver"
import { GetStatisticInputType } from "../models/inputs/get-statistic-user-input"

@Resolver(StatisticQueryType)
export class StatisticQueryResolver {
    constructor(private readonly StatisticService: StatisticService) { }

    @ResolveField(() => GetStatisticResultType, { middleware: [CheckAuthMiddleware] })
    async getStatistic(@Args() input: GetStatisticInputType): Promise<GetStatisticResultType> {
        return this.StatisticService.getStatisticByUsers(input);
    }



}