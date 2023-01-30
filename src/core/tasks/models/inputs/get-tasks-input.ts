import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class GetTasksInputType  {
    
    @IsNumber()
    @Field(() => Int)
    id: number


    @IsNumber()
    @IsOptional()
    @Field(() => Int, {nullable: true})
    authorId?: number


    @IsOptional()
    @IsString()
    @Field( {nullable: true})
    name?: string


    @IsOptional()
    @Field(()=> String, {nullable: true})
    description?: string | null 


    @IsOptional()
    @IsDate()
    @Field(() => Date, {nullable: true})
    expires?: Date


    @IsOptional()
    @IsBoolean()
    @Field(() => Boolean, {nullable: true})
    isCompleted?: boolean
} 





