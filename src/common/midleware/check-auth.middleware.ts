import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { PrismaService } from "../../database/prisma.service";
import jwtDecode from 'jwt-decode';

export const CheckAuthMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const auth = ctx.context.req.cookies['authorization'] || ctx.context.req.headers.authorization;
  const prismaService = new PrismaService();
  if (!!auth) {
    const { email }: any = jwtDecode(auth)
    if (!!email) {
      const user = await prismaService.user.findUnique({ where: { email } });
      if (!!user) {
        return next();
      }
    }
  }
  return { success: false };
};