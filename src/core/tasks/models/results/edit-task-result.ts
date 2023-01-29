import { BaseResultType } from "../../../../common/models/base-result-type";
import { Field, ObjectType } from "@nestjs/graphql";
import { Task } from "../../task";


@ObjectType()
export class EditTaskResultType extends BaseResultType {
    @Field(() => Task, {
        nullable: true,
        description: 'Edit Task',
    })
    task: Task | null;
}