import { User } from "../../user";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseResultType } from "../../../../common/models/base-result-type";

@ObjectType()
export class GetUsersResultType extends BaseResultType {
    @Field(() => [User], {
        nullable: true,
        description: 'User list',
    })
    users: User[];
}
