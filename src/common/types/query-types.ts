
type queryName = 'task' | 'user';

export type QueryCacheType = {
    query: queryName;
}


export type MutationCacheType = {
    query: 'updateTask' | 'deleteTask';
}