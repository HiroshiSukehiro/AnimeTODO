import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultType } from '../../../../common/models/base-result-type';
import { Task } from '../../task';

@ObjectType()
export class GetTasksResultType extends BaseResultType {
    @Field(() => [Task], {
        nullable: true,
        description: 'Task list',
    })
    tasks: Task[];
}