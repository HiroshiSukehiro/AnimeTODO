import { CacheBaseService } from "../../../common/cache/services/cache-base.service";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";


@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private readonly cacheService: CacheBaseService) {}

  intercept(context: ExecutionContext, next: CallHandler): any {    
    // Graphql
    if (context.getType<GqlContextType>() === 'graphql') {
      // console.log('IS GRAPH INTERCEPTOR');
      
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo();
      
      const res: Response = gqlContext.getContext();
      // console.log('int-res', res);
      // // Get user that sent request
      // const userId = context.getArgByIndex(2).req.user.userId;
      // const parentType = info.parentType.name;
      // const fieldName = info.fieldName;
      // const body = info.fieldNodes[0]?.loc?.source?.body;
      // const message = `GraphQL - ${parentType} - ${fieldName}`;


    }
    return next.handle();
  }

}