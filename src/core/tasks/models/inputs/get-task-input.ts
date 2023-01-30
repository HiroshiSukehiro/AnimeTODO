import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ArgsType()
export class GetTaskInputType  {
    
    @IsNumber()
    @Field(() => Int)
    id: number
} 