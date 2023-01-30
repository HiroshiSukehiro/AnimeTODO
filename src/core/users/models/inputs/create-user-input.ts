import { ArgsType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
@ArgsType()
export class CreateUserInputType  {
    @IsString({message: 'Имя обязательно'})
    @IsNotEmpty({message: 'Имя обязательно'})
    @Field(() => String)
    username: string;

    @IsEmail({}, {message: 'Email обязателен'})
    @IsNotEmpty({message: 'Email обязателен'})
    @Field(() => String)
    email: string;

    @IsString({message: 'Пароль обязателен'})
    @IsNotEmpty({message: 'Пароль обязателен'})
    @Field(() => String)
    password: string;

    @IsOptional()
    @IsString()
    @Field(() => String)
    firstname: string;

    @IsOptional()
    @IsString()
    @Field(() => String)
    lastName: string;
} 