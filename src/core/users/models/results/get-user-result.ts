import { BaseResultType } from "../../../../common/models/base-result-type";
import { Field, ObjectType } from "@nestjs/graphql";
import { UserWithoutPass } from "../../user";



@ObjectType()
export class GetUserResultType extends BaseResultType {
    @Field(() => UserWithoutPass, {
        nullable: true,
        description: 'User',
    })
    user: UserWithoutPass | null;
}
