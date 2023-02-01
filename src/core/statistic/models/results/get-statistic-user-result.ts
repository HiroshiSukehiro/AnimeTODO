
import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultType } from '../../../../common/models/base-result-type';
import { StatisticUser } from '../../statistic';

@ObjectType()
export class GetStatisticResultType extends BaseResultType {
    @Field(() => [StatisticUser], {
        nullable: true,
        description: 'getStatisticByUser',
    })
    statistic: StatisticUser[] | null;
}
