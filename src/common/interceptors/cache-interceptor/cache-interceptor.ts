import { CacheBaseService } from "../../cache/services/cache-base.service";
import { CallHandler, CanActivate, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { Reflector } from "@nestjs/core";
import { SetMetadata } from '@nestjs/common';
import { QueryCacheType } from "../../types/query-type";

export const ReqType = (query: QueryCacheType) => SetMetadata('query', query);

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    private readonly cacheService: CacheBaseService, 
    private reflector: Reflector
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): any {    
    // Graphql
    if (context.getType<GqlContextType>() === 'graphql') {
      
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo();
      console.log('IS GRAPH INTERCEPTOR', info.variableValues);

      const query = this.reflector.get<QueryCacheType>('query', context.getHandler());
      if (Number.isInteger(info.variableValues.id)) 
      this.cacheService.resolver(query, info.variableValues.id)

      const res: Response = gqlContext.getContext();
      console.log('int-res', query);
    }
    return next.handle();
  }
}