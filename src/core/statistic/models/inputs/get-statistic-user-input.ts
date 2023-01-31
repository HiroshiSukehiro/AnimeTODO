import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { PaginationInputType } from "../../../../common/models/pagination/pagination-input"

@ArgsType()
export class GetStatisticInputType extends PaginationInputType {

    @Field(() => Int, { nullable: true })
    id: number

    @Field(() => Int, { nullable: true })
    userId?: number

    @Field(() => String, { nullable: true })
    message?: string

    @Field(() => String, { nullable: true })
    args?: string | null

    @Field(() => String, { nullable: true })
    sourse?: string | null

    @Field(() => Date, { nullable: true })
    createdAt?: Date
} 