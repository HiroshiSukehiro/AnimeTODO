import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultType } from '../../../../common/models/base-result-type';
import { Task } from '../../task';

@ObjectType()
export class GetTaskByStatusResultType extends BaseResultType {
    @Field(() => [Task], {
        nullable: true,
        description: 'Get a list of tasks by status',
    })
    task: Task[];
}


