import { BaseResultType } from "../../../../common/models/base-result-type";
import { Field, ObjectType } from "@nestjs/graphql";
import { UserWithoutPass, UserWithLogs } from "../../user";

@ObjectType()
export class GetUserResultType extends BaseResultType {
    @Field(() => UserWithoutPass, {
        nullable: true,
        description: 'User',
    })
    user: UserWithoutPass | null;
}

@ObjectType()
export class GetUserWithLogsResultType extends BaseResultType {
    @Field(() => UserWithLogs, {
        nullable: true,
        description: 'User with Logs',
    })
    user: UserWithLogs  | null;
}