import { CacheDBService } from "../../cache/services/cache-db.service";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlContextType, GqlExecutionContext, GraphQLExecutionContext } from "@nestjs/graphql";
import { CacheType, OperationType } from "../../types/cache-types";

@Injectable()
export class CacheMutationInterceptor implements NestInterceptor {
  constructor(
    private readonly cacheDBService: CacheDBService, 
    private reflector: Reflector
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): any {    
    if (context.getType<GqlContextType>() === 'graphql') {;
        const req = context.getArgByIndex(2).req;

        req.fill = (param: OperationType) => (data: any) => {
            const query = this.reflector.get<CacheType>('options', context.getHandler());
            this.cacheDBService.mutationResolver(query, param, data);
        };
        
        
    }
    
    return next.handle();
  }
}