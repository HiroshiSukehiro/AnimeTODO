import { CacheDBService } from "../../cache/services/cache-db.service";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { Reflector } from "@nestjs/core";
import { SetMetadata } from '@nestjs/common';
import { QueryCacheType } from "../../types/query-types";


export const ReqType = (query: QueryCacheType) => SetMetadata('query', query);

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    private readonly cacheDBService: CacheDBService, 
    private reflector: Reflector
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): any {    
    if (context.getType<GqlContextType>() === 'graphql') {
      
      const gqlContext = GqlExecutionContext.create(context);
      const ctx = gqlContext.getContext();

      const query = this.reflector.get<QueryCacheType>('query', context.getHandler());
      const id = ctx.req.body.variables.id;
      
      if (Number.isInteger(id)) {
        this.cacheDBService.queryResolver(query, id)
      }
    }
    return next.handle();
  }
}