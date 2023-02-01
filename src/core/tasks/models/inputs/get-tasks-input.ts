import { PaginationInputType } from '../../../../common/models/pagination/pagination-input';
import { ArgsType, Field, Int } from '@nestjs/graphql';
import { TaskStatus } from '@prisma/client';

@ArgsType()
export class GetTasksInputType extends PaginationInputType {
    
    @Field(() => Int, { nullable: true })
    id?: number

    @Field(() => Int, { nullable: true })
    authorId?: number

    @Field(() => String, { nullable: true })
    name?: string

    @Field(()=> String, { nullable: true })
    description?: string | null 

    @Field(() => TaskStatus, { nullable: true })
    status?: TaskStatus

    @Field(() => Date, { nullable: true })
    expires?: Date

    @Field(() => Boolean, { nullable: true })
    isCompleted?: boolean
} 





