import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';

import {
    GetStatisticResultType,
} from '../models/results/get-statistic-user-result';

@ObjectType()

@ObjectType()
export class StatisticQueryType {
    @Field(() => GetStatisticResultType, {
        description: 'Get user by Statistic',
    })
    getStatistic: GetStatisticResultType;

}

@Resolver()
export class StatisticRootResolver {
    @Query(() => StatisticQueryType, {
        description: 'Statistic queries'
    })
    StatisticQueries() {
        return {};
    }
}