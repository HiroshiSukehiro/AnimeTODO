import { ArgsType, Field } from '@nestjs/graphql';
import { TaskStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

@ArgsType()
export class GetTaskByStatusInputType  {
    
    @IsEnum(TaskStatus, {message: "Не верный статус задачи"})
    @Field(() => TaskStatus)
    status: TaskStatus
} 