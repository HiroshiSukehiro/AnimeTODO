import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { CreateTaskInputType, GetTaskInputType, GetTasksInputType } from '../models/inputs';
import { CreateTaskResultType } from '../models/results';
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
    async createTask(@Args() input: CreateTaskInputType): Promise<CreateTaskResultType> {
        const task = await this.taskService.createTask(input);
        return {task, success: true}
    }

    async editTask(input: GetTasksInputType){
        const task = await this.taskService.editTask(input);
        return {task, success: true}
    }
    async deleteTask(id: GetTaskInputType){
        const task = await this.taskService.deleteTask(id);
        return {task, success: true}
    }

}