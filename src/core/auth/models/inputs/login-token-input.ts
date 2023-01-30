import { ArgsType, Field } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";

@ArgsType()
export class LoginTokenInputType  {
    @IsEmail()
    @Field(() => String)
    email: string;

    @IsString()
    @Field(() => String)
    password: string;
} 