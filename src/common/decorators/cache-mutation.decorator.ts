import { CacheMutationInterceptor } from "../interceptors/cache-interceptor/cache-mutation.interceptor";
import { applyDecorators, SetMetadata, UseInterceptors } from "@nestjs/common";
import { CacheType } from "../types/cache-types";


export const CacheMutation = (params: CacheType) => {    
    return applyDecorators(
            SetMetadata('options', params),
            UseInterceptors(CacheMutationInterceptor)
    );
};