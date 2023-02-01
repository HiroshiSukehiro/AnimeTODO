
type CacheOptionsType = 'data' | 'count';

export type CacheOptions = {
    type: CacheOptionsType
}

type queryName = 'task' | 'user';

export type CacheType = {
    type: queryName;
}

export type OperationType = 'update' | 'delete';