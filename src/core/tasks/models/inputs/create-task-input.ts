import { ArgsType, Field, Int } from "@nestjs/graphql";
import { TaskStatus } from "../../task";


@ArgsType()
export class CreateTaskInputType  {
    @Field(() => Int)
    authorId: number

    @Field()
    name: string

    @Field({nullable: true})
    description?: string

    @Field(() => Date)
    expires: Date

    @Field(() => Boolean)
    isCompleted: boolean

    @Field(() => TaskStatus)
    status: TaskStatus
} 