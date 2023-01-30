import { BaseResultType } from "../../../../common/models/base-result-type";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LoginResultType extends BaseResultType {
    @Field(() => String, {
        nullable: true,
        description: 'Token',
    })
    token: String;
}