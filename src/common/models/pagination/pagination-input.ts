import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";


@ArgsType()
export class PaginationInputType {
    @Field(() => Int, { nullable: true })
    skip?: number;

    @Field(() => Int, { nullable: true })
    take?: number;
}