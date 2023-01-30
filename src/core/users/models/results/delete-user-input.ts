import { BaseResultType } from "../../../../common/models/base-result-type";
import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../../user";

@ObjectType()
export class DeleteUserResultType extends BaseResultType {
    @Field(() => User, {
        nullable: true,
        description: 'Delete User',
    })
    user: User | null;
}