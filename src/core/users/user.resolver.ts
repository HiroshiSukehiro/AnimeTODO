import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User, UserWithoutPass } from "./user";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";


@Resolver(User)
export class UserResolver {
    constructor(
        private userService: UserService
    ) {}
    
    @Mutation()
    async createUser(@Args('input') input: CreateUserDto): Promise<Object> {
        return await this.userService.CreateUser(input);
    }

    @Query(() => User)
    async getUser(@Args('id') id: number): Promise<UserWithoutPass | null> {
        return await this.userService.GetUser(id);
    }

    @Query(() => [User])
    async getAllUsers(): Promise<UserWithoutPass[]> {
        return await this.userService.GetAllUsers();
    }
}