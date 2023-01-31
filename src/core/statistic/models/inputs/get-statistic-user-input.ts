import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ArgsType()
export class GetStatisticInputType {

    @IsNumber()
    @Field(() => Int)
    id: number
} 