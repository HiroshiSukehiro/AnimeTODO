import { CacheDBService } from "../../cache/services/cache-db.service";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { Reflector } from "@nestjs/core";
import { CacheType } from "../../types/cache-types";

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    private readonly cacheDBService: CacheDBService, 
    private reflector: Reflector
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): any {    
    if (context.getType<GqlContextType>() === 'graphql') {

      const type = this.reflector.get<CacheType>('options', context.getHandler());
      const req = context.getArgByIndex(2).req;
      req.getIfExists = async (id: number) => {
        return await this.cacheDBService.receiver(type, id)
      }
      
      const gqlContext = GqlExecutionContext.create(context);
      const ctx = gqlContext.getContext();
      const id = ctx.req.body.variables.id;

      if (Number.isInteger(id)) {
        this.cacheDBService.queryResolver(type, id)
      }
    }
    return next.handle();
  }
}