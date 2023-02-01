import { applyDecorators, SetMetadata, UseInterceptors } from "@nestjs/common";
import { CacheType } from "../types/cache-types";
import { CacheInterceptor } from "../interceptors/cache-interceptor/cache-interceptor";


export const CacheQuery = (params: CacheType) => {    
    return applyDecorators(
            SetMetadata('options', params),
            UseInterceptors(CacheInterceptor)
    );
};