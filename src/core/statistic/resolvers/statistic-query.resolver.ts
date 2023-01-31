import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { StatisticService } from '../services/statistic.service';
import { GetStatisticResultType } from "../models/results/get-statistic-user-result"
import { StatisticQueryType, StatisticRootResolver } from "./statistic-root.resolver"


@Resolver(StatisticQueryType)
export class StatisticQueryResolver {
    constructor(private readonly StatisticService: StatisticService) { }

    @ResolveField(() => GetStatisticResultType)
    async getStatistic(): Promise<GetStatisticResultType> {
        return this.StatisticService.getStatisticByUsers();
    }



}