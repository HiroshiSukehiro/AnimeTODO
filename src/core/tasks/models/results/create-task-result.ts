import { BaseResultType } from "../../../../common/models/base-result-type";
import { Field, ObjectType } from "@nestjs/graphql";
import { Task } from "../../task";


@ObjectType()
export class CreateTaskResultType extends BaseResultType {
    @Field(() => Task, {
        nullable: true,
        description: 'Task',
    })
    task: Task | null;
}