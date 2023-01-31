
type queryName = 'task' | 'user' | "statistic";

export type QueryCacheType = {
    query: queryName;
}


export type MutationCacheType = {
    query: 'updateTask' | 'deleteTask';
}