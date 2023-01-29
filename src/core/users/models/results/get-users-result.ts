import { UserWithoutPass } from "../../user";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseResultType } from "../../../../common/models/base-result-type";

@ObjectType()
export class GetUsersResultType extends BaseResultType {
    @Field(() => [UserWithoutPass], {
        nullable: true,
        description: 'User list',
    })
    users: UserWithoutPass[];
}
