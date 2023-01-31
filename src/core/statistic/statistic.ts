import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { TaskStatus } from '@prisma/client';

registerEnumType(TaskStatus, {
    name: 'TaskStatus'
})

@ObjectType()
export class Statistic {
    @Field(() => Int)
    id: number

    @Field(() => Int)
    userId: number

    @Field()
    message: string

    @Field(() => String, { nullable: true })
    args?: string | null

    @Field(() => String, { nullable: true })
    sourse?: string | null

    @Field(() => Date, { defaultValue: new Date() })
    createdAt: Date

}