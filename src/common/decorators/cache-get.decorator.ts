import { createParamDecorator, ExecutionContext } from "@nestjs/common";



export const CacheGet = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        
        return ctx.getArgByIndex(2).req.getIfExists;
    },
);