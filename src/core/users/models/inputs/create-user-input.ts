import { ArgsType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";



@ArgsType()
export class CreateUserInputType  {
    @IsString({message: 'Имя обязательно'})
    @IsNotEmpty({message: 'Имя обязательно'})
    username: string;

    @IsEmail({}, {message: 'Email обязателен'})
    @IsNotEmpty({message: 'Email обязателен'})
    email: string;

    @IsString({message: 'Пароль обязателен'})
    @IsNotEmpty({message: 'Пароль обязателен'})
    password: string;

    @IsOptional()
    @IsString()
    firstname: string;

    @IsOptional()
    @IsString()
    lastName: string;
} 