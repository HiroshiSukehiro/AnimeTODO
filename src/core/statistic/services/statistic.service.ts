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
        delete where.dateStart;
        delete where.dateEnd;

        const skip = input.skip || 0;
        const take = input.skip || 10;

        const dateStart = input.dateStart
            ? new Date(input.dateStart).toISOString()
            : new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString()
        const dateEnd = input.dateEnd
            ? new Date(input.dateEnd).toISOString()
            : new Date(Date.now()).toISOString()

        const statistic = await this.prismaService.logs.groupBy({
            where: {
                AND: [
                    { createdAt: { gte: dateStart } },
                    { createdAt: { lte: dateEnd } }
                ]
            },
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
        const data = [];
        for (let i = 0; i < statistic.length; i++) {
            data[i] = { user: await this.prismaService.user.findUnique({ where: { id: statistic[i].userId } }), count: statistic[i]._count.userId }
        }
        return { statistic: data, success: true, statisticCount: statistic.length }
    }
}
