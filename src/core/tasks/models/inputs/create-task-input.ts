import { ArgsType, Field, Int } from '@nestjs/graphql';
import { TaskStatus } from '@prisma/client';
import { IsDate, IsOptional, IsString, IsBoolean, Length, IsNumber, IsEnum } from "class-validator"


@ArgsType()
export class CreateTaskInputType  {
   
    @IsNumber()
    @Field(() => Int)
    authorId: number

    @Length(5, 35,{message: 'Не верная длина поля NAME (5-35 символов)'})
    @Field()
    name: string

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    description?: string

    @IsDate({message: 'Не верная форма даты, укажите дату!'})
    @Field(() => Date)
    expires: Date

    @IsBoolean()
    @Field(() => Boolean, {defaultValue: false})
    isCompleted: boolean

    @IsEnum(TaskStatus, {message: "Не верный статус задачи"})
    @Field(() => TaskStatus)
    status: TaskStatus
} 