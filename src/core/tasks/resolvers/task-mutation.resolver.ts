import { CacheMutation } from '../../../common/decorators/cache-mutation.decorator';
import { CacheIn } from '../../../common/decorators/cache-in.decorator';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { CreateTaskInputType } from '../models/inputs';
import { CreateTaskResultType, DeleteTaskResultType, EditTaskResultType } from '../models/results';
import { TaskMutationType, TaskRootResolver } from '../resolvers/task-root.resolver';
import { TaskService } from '../services/task.service';
import { EditTaskInputType } from '../models/inputs/edit-task-input';
import { DeleteTaskInputType } from '../models/inputs/delete-task-input';



@Resolver(TaskMutationType)
export class TaskMutationResolver extends TaskRootResolver {
    constructor(private readonly taskService: TaskService) {
        super();
    }

    @ResolveField(() => CreateTaskResultType)
    async createTask(@Args() input: CreateTaskInputType): Promise<CreateTaskResultType> {
        return await this.taskService.createTask(input);
    }

    @ResolveField(() => EditTaskResultType)
    async editTask(@Args() input: EditTaskInputType, @CacheIn('update') cacheIn: Function): Promise<EditTaskResultType> {        
        return await this.taskService.editTask(input, cacheIn);
    }

    @ResolveField(() => DeleteTaskResultType)
    async deleteTask(@Args() id: DeleteTaskInputType, @CacheIn('delete') cacheIn: Function): Promise<DeleteTaskResultType>{
        return await this.taskService.deleteTask(id, cacheIn);
    }

}