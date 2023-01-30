import {Injectable } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma.service';


@Injectable()
export class LoggingService {
        constructor(
     private readonly prismaService: PrismaService
    ) {

    }

        
}