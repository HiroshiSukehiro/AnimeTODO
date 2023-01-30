import { ArgsType, Field } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";

@ArgsType()
export class DeleteUserInputType  {
    @IsEmail()
    @Field(() => String)
    email: string;

    @IsString()
    @Field(() => String)
    password: string;

} 