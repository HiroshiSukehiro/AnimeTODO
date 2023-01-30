import { ArgsType, Field } from "@nestjs/graphql";
import { IsEmail, IsOptional, IsString } from "class-validator";

@ArgsType()
export class UpdateUserInputType  {
    @IsOptional()
    @IsString()
    @Field(() => String)
    username: string;

    @IsEmail()
    @Field(() => String)
    email: string;

    @IsString()
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