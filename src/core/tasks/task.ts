import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { User } from "graphql";

export enum TaskStatus {
    PENDING = 'PENDING',
    IN_WORK = 'IN_WORK',
    COMPLETED = 'COMPLETED'
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

    // @Field(() => User)
    // author: User
}