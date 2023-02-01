import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";

export class GraphqlUserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
  
        console.log('request', request);
  
        return next.handle();
    }
  }