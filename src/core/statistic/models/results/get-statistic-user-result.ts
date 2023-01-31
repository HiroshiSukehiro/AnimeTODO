
import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultType } from '../../../../common/models/base-result-type';
import { Statistic } from '../../statistic';

@ObjectType()
export class GetStatisticResultType extends BaseResultType {
    @Field(() => [Statistic], {
        nullable: true,
        description: 'getStatisticByLog',
    })
    statistic: Statistic[] | null;
}
