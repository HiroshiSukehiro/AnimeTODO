import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetTaskInputType  {
    @Field(() => Int)
    id: number
} 