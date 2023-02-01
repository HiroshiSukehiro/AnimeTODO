import { Field, Int, ObjectType, } from '@nestjs/graphql';

@ObjectType()
export class Statistic {
    @Field(() => Int)
    id: number

    @Field(() => Int)
    userId: number

    @Field(() => String, { nullable: true })
    message?: string

    @Field(() => String, { nullable: true })
    args?: string | null

    @Field(() => String, { nullable: true })
    sourse?: string | null

    @Field(() => Date, { defaultValue: new Date() })
    createdAt: Date

}