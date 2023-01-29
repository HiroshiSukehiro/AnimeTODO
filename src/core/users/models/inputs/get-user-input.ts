import { ArgsType, Field, Int } from "@nestjs/graphql";


@ArgsType()
export class GetUserInputType {
    @Field(() => Int, {
        nullable: true,
        description: 'User id',
    })
    id: number
}
