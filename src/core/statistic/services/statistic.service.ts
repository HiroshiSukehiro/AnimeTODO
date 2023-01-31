/*
https://docs.nestjs.com/providers#services
*/
import { PrismaService } from '../../../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { GetStatisticResultType } from "../models/results/get-statistic-user-result";
import { GetStatisticInputType } from "../models/inputs/get-statistic-user-input";
@Injectable()
export class StatisticService {

    constructor(private readonly prismaService: PrismaService) { }

    async getStatisticByUsers(input: GetStatisticInputType): Promise<GetStatisticResultType> {
        const where = { ...input };
        delete where.skip;
        delete where.take;

        const skip = input.skip || 0;
        const take = input.skip || 10;
        const statistic = await this.prismaService.logs.groupBy({
            by: ['userId'],
            _count: {
                userId: true,
            },
            orderBy: {
                _count: {
                    userId: 'desc'
                }
            },
            skip,
            take
        })
        const result = statistic.map((el) => { return { userId: el.userId, count: el._count.userId } })
        return { statistic: result, success: true }
    }
}
