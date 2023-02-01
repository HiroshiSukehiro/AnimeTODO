import { ArgsType, Field, Int } from "@nestjs/graphql";
import { TaskStatus } from "@prisma/client";


@ArgsType()
export class EditTaskInputType {
    @Field(() => Int)
    id: number

    @Field(() => Int, { nullable: true })
    authorId?: number

    @Field(() => String, { nullable: true })
    name?: string

    @Field(()=> String, { nullable: true })
    description?: string | null 

    @Field(() => Date, { nullable: true })
    expires?: Date

    @Field(() => Boolean, { nullable: true })
    isCompleted?: boolean

    @Field(() => TaskStatus, { nullable: true })
    status?: TaskStatus

}