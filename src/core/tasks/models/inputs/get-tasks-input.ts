import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetTasksInputType  {
    @Field(() => Int)
    id: number

    @Field(() => Int, {nullable: true})
    authorId?: number

    @Field( {nullable: true})
    name?: string

    @Field(()=> String, {nullable: true})
    description?: string | null 

    @Field(() => Date, {nullable: true})
    expires?: Date

    @Field(() => Boolean, {nullable: true})
    isCompleted?: boolean
} 





