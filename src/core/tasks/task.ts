import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { TaskStatus } from '@prisma/client';

registerEnumType(TaskStatus, {
    name: 'TaskStatus'
})

@ObjectType()
export class Task {
    @Field(() => Int)
    id: number

    @Field(() => Int)
    authorId: number

    @Field()
    name: string

    @Field(()=> String, {nullable: true})
    description?: string | null 

    @Field(() => Date)
    expires: Date

    @Field(() => Boolean)
    isCompleted: boolean

    @Field(() => TaskStatus)
    status: TaskStatus

    @Field(() => Date, {defaultValue: new Date()})
    createdAt: Date

    @Field(() => Date, {nullable: true})
    updatedAt?: Date | null

    // @Field(() => User)
    // author: User
}