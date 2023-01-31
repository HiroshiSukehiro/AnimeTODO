/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../../database/prisma.service";
import { GetStatisticInputType } from "../models/inputs/get-statistic-user-input"
import { GetStatisticResultType } from "../models/results/get-statistic-user-result"


@Injectable()
export class LoggerService {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async getStatistic(input: GetStatisticInputType, { middleware: [] }): Promise<GetStatisticResultType> {
        // if(!req.user)
        const statistic = await this.prismaService.logs.findMany({
            where: { userId: input.id }
        })
        return { statistic, success: true }
    }
}
