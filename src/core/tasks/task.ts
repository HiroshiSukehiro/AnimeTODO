import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";

export enum TaskStatus {
    PENDING,
    IN_WORK,
    COMPLETED
}

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

    @Field({nullable: true})
    description?: string

    @Field(() => Date)
    expires: Date

    @Field(() => Boolean)
    isCompleted: boolean

    @Field(() => TaskStatus)
    status: TaskStatus

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date, {nullable: true})
    updatedAt?: Date

    @Field(() => Object)
    author: Object
}