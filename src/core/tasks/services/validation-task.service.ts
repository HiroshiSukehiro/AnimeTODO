import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationTaskService {
    protected  validationTaskSuccess(task: any) {
        if(!task){
            return {
                success: false,
                task: null,
            };
        }
        return{
            success: true,
            task,
        }

    }
}