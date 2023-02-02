import { Field, Int, ObjectType, } from '@nestjs/graphql';
import { UserWithoutPass } from "../users/user"

@ObjectType()
export class StatisticUser {

    @Field(() => Int)
    count: number

    @Field(() => UserWithoutPass)
    user: UserWithoutPass | null

}