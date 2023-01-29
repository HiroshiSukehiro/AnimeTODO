import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { CreateTaskInputType } from '../models/inputs/create-task-input';
import { CreateTaskResultType } from '../models/results/create-task-result';
import { TaskMutationType, TaskRootResolver } from '../resolvers/task-root.resolver';
import { TaskService } from '../services/task.service';



@Resolver(TaskMutationType)
export class TaskMutationResolver extends TaskRootResolver {
    constructor(
        private readonly taskService: TaskService
    ) {
        super();
    }

    @ResolveField(() => CreateTaskResultType)
    async createTask(@Args() input: CreateTaskInputType) {
        const task = await this.taskService.createTask(input);
        return {task, success: true}
    }

    async editTask(){
        
    }
    async deleteTask(){

    }

}