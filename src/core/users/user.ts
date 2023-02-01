import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Log } from "../log/log";
import { IsEmail } from 'class-validator';
import { Task } from "../tasks/task";

@ObjectType()
export class User {
    @Field(() => Int)
    id: number

    @Field()
    email: string

    @Field()
    @IsEmail()
    username: string

    @Field()
    passwordHash: string

    @Field(() => String, { nullable: true })
    firstname?: string | null

    @Field(() => String, { nullable: true })
    lastName?: string | null

    @Field(() => Date)
    createdAt: Date
}

@ObjectType()
export class UserWithoutPass {
    @Field(() => Int)
    id: number

    @Field()
    email: string

    @Field()
    @IsEmail()
    username: string

    @Field(() => String, { nullable: true })
    firstname?: string | null

    @Field(() => String, { nullable: true })
    lastName?: string | null

    @Field(() => Date)
    createdAt: Date
}

@ObjectType()
export class UserWithLogs {
    @Field(() => Int)
    id: number

    @Field()
    email: string

    @Field(() => Int, { nullable: true })
    statisticRang?: number

    @Field(() => Int, { nullable: true })
    statisticScore?: number

    @Field()
    @IsEmail()
    username: string

    @Field(() => String, { nullable: true })
    firstname?: string | null

    @Field(() => String, { nullable: true })
    lastName?: string | null

    @Field(() => Date)
    createdAt: Date

    @Field(() => [Task], { nullable: true })
    tasks?: Task[]

    @Field(() => [Log], { nullable: true })
    logs?: Log[]
}