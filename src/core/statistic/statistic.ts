import { Field, Int, ObjectType, } from '@nestjs/graphql';


@ObjectType()
export class StatisticUser {
  
    @Field(() => Int)
    count: number

    @Field(() => Int)
    userId: number

}