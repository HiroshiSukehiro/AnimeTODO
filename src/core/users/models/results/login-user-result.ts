import { BaseResultType } from "../../../../common/models/base-result-type";
import { Field, ObjectType } from "@nestjs/graphql";
import { UserWithoutPass } from "../../user";

@ObjectType()
export class LoginUserResultType extends BaseResultType {
    @Field(() => UserWithoutPass, {
        nullable: true,
        description: 'Login',
    })
    user: UserWithoutPass | null;

    @Field(() => String)
    token: String
}
