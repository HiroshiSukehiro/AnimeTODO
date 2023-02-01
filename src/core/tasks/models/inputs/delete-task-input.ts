import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class DeleteTaskInputType {
    @Field(() => Int)
    id: number;
}