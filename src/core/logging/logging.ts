import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { TaskStatus } from '@prisma/client';

registerEnumType(TaskStatus, {
    name: 'TaskStatus'
})

@ObjectType()
export class Logger {
    @Field(() => Int)
    id: number

    @Field(() => Int)
    authorId: number

    @Field(() => String)
    message: string

    @Field(() => String)
    args: string

    @Field(() => String)
    sourse: string

    @Field(() => Date, { defaultValue: new Date() })
    createdAt: Date
}