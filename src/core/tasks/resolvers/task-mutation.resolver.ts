import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { CreateTaskInputType, GetTaskInputType, GetTasksInputType } from '../models/inputs';
import { CreateTaskResultType, DeleteTaskResultType, EditTaskResultType } from '../models/results';
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

    @ResolveField(() => EditTaskResultType)
    async editTask(@Args() input: GetTasksInputType){
        console.log(input)
        return await this.taskService.editTask(input);
    }

    @ResolveField(() => DeleteTaskResultType)
    async deleteTask(@Args() id: GetTaskInputType){
        const task = await this.taskService.deleteTask(id);
        return {task, success: true}
    }

}