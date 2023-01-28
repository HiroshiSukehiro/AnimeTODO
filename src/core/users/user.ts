import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsEmail } from 'class-validator';

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

    @Field({ nullable: true })
    firstname?: string
    
    @Field({ nullable: true })
    lastName?: string

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date, { nullable: true })
    deleted?: Date
}