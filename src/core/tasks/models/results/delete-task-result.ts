import { BaseResultType } from "../../../../common/models/base-result-type";
import { Field, ObjectType } from "@nestjs/graphql";
import { Task } from "../../task";


@ObjectType()
export class DeleteTaskResultType extends BaseResultType {
    @Field(() => Task, {
        nullable: true,
        description: 'Delete Task',
    })
    task: Task | null;
}