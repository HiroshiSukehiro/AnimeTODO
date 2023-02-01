import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { PrismaService } from '../../database/prisma.service';

export const LoggerMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  if (!!ctx.context.req.user) {
    const message = `[${new Date().toLocaleString()}] | [operationName: ${ctx.context.req.body.operationName}] \n ${ctx.context.req.headers['user-agent']}`;
    const args = JSON.stringify(ctx.args);
    const prismaService = new PrismaService();
    const value = await next();
    const data = await prismaService.logs.create({
      data: {
        message,
        args,
        sourse: JSON.stringify(value),
        userId: ctx.context.req.user?.id
      }
    })
    return value;
  }
  return await next();
};