import { Field, ObjectType } from "@nestjs/graphql";
import { Task } from "../../task";
import { BaseResultType } from "../../../../common/models/base-result-type";

@ObjectType()
export class GetTasksResultType extends BaseResultType {
    @Field(() => [Task], {
        nullable: true,
        description: 'Task list',
    })
    tasks: Task[];
}