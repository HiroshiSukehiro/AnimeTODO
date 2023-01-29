import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetTasksInputType  {
    @Field(() => Int)
    id?: number

    @Field(() => Int)
    authorId?: number

    @Field()
    name?: string

    @Field(()=> String, {nullable: true})
    description?: string | null 

    @Field(() => Date)
    expires?: Date

    @Field(() => Boolean)
    isCompleted?: boolean
} 





