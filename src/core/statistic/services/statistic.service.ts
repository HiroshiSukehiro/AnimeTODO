/*
https://docs.nestjs.com/providers#services
*/
import { PrismaService } from '../../../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { GetStatisticResultType } from "../models/results/get-statistic-user-result"

@Injectable()
export class StatisticService {

    constructor(private readonly prismaService: PrismaService) { }

    async getStatisticByUsers(): Promise<GetStatisticResultType> {
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
        })
        const result = statistic.map((el) => { return { userId: el.userId, count: el._count.userId } })
        return { statistic: result, success: true }
    }
}
