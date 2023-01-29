import { BaseResultType } from "../../../../common/models/base-result-type";
import { Field, ObjectType } from "@nestjs/graphql";
import { UserWithoutPass } from "../../user";


@ObjectType()
export class UpdateUserResultType extends BaseResultType {
    @Field(() => UserWithoutPass, {
        nullable: true,
        description: 'Task',
    })
    user: UserWithoutPass | null;
}