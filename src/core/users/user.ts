import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Statistic } from "../statistic/statistic";
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

    @Field(() => String, {nullable: true})
    firstname?: string | null
    
    @Field(() => String, {nullable: true})
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

    @Field(() => String, {nullable: true})
    firstname?: string | null
    
    @Field(() => String, {nullable: true})
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

    @Field()
    @IsEmail()
    username: string

    @Field(() => String, {nullable: true})
    firstname?: string | null
    
    @Field(() => String, {nullable: true})
    lastName?: string | null

    @Field(() => Date)
    createdAt: Date

    @Field(() => [Task], {nullable: true})
    tasks?: Task[]

    @Field(() => [Statistic], {nullable: true})
    logs?: Statistic[]
}