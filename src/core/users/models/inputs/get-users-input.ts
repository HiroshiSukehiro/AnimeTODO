import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class GetUsersInputType {
    @Field(() => Int, {
        nullable: true,
        description: 'User id',
    })
    id: number;
}
