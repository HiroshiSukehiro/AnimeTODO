import { Field, ObjectType } from "@nestjs/graphql";



@ObjectType()
export class BaseResultType {
    @Field(() => Boolean, {
        description: 'Request was successful'
    })
    success: boolean

    // @Field(() => Array<String>, {
    //     description: 'Errors description'
    // })
    // errors: Array<string>
}