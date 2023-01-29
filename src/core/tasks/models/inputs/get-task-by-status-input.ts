import { ArgsType, Field, Int } from '@nestjs/graphql';
import { TaskStatus } from '@prisma/client';

@ArgsType()
export class GetTaskByStatusInputType  {
    @Field(() => TaskStatus)
    status: TaskStatus
} 