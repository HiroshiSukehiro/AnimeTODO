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