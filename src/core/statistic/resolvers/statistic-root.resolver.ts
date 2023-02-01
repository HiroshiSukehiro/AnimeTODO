import { UseInterceptors } from '@nestjs/common';
import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';

import { CacheInterceptor, ReqType } from '../../../common/interceptors/cache-interceptor/cache-interceptor';
import {
    GetStatisticResultType,
} from '../models/results/get-statistic-user-result';

@ObjectType()
export class StatisticMutationType {

    @Field(() => GetStatisticResultType, {
        description: 'Delete Statistic',
    })
    deleteStatistic: GetStatisticResultType;
}

@ObjectType()
export class StatisticQueryType {
    @Field(() => GetStatisticResultType, {
        description: 'Get user by Statistic',
    })
    getStatistic: GetStatisticResultType;

}

@Resolver()
export class StatisticRootResolver {
    @Mutation(() => StatisticMutationType, {
        description: 'Statistic mutations',
    })
    StatisticMutations() {
        return {};
    }

    @ReqType({ query: 'statistic' })
    @UseInterceptors(CacheInterceptor)
    @Query(() => StatisticQueryType, {
        description: 'Statistic queries'
    })
    StatisticQueries() {
        return {};
    }
}