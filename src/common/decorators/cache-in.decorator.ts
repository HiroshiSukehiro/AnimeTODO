import { OperationType } from "../../common/types/cache-types";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const CacheIn = createParamDecorator(
    (OPType: OperationType, ctx: ExecutionContext) => {
        
        return ctx.getArgByIndex(2).req.fill(OPType);
    },
);