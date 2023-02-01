import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";

export class GraphqlUserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
  
        return next.handle();
    }
}