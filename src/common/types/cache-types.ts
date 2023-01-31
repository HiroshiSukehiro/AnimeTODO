import { Prisma, Task, User } from "@prisma/client";

type CacheOptionsType = 'data' | 'count';

export type CacheOptions = {
    type: CacheOptionsType
}

export type Receiver<T> = Prisma.Prisma__UserClient<T | null, null>