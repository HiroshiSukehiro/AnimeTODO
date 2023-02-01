import { Field, ObjectType } from "@nestjs/graphql";



@ObjectType()
export class BaseResultType {
    @Field(() => Boolean, {
        description: 'Request was successful'
    })
    success: boolean

    @Field(() => [String], {
        defaultValue: [],
        description: 'Errors description'
    })
    errors?: string[]
}