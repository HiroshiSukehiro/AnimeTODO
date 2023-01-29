import { BaseResultType } from "../../../../common/models/base-result-type";
import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../../user";


@ObjectType()
export class CreateUserResultType extends BaseResultType {
    @Field(() => User, {
        nullable: true,
        description: 'Task',
    })
    user: User | null;
}