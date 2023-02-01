import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { PrismaService } from "../../database/prisma.service";
import jwtDecode from 'jwt-decode';

interface email {
    email: string
}

export const AuthMiddleware: FieldMiddleware = async (
    ctx: MiddlewareContext,
    next: NextFn,
) => {
    if (!ctx.context.req.user) {
        const auth = ctx.context.req.cookies['authorization'] || ctx.context.req.headers.authorization;
        const prismaService = new PrismaService();
        if (!!auth) {
            const { email }: email = jwtDecode(auth);
            if (!!email) {
                const user = await prismaService.user.findUnique({ where: { email } });
                if (!!user) {
                    ctx.context.req.user = user;
                    return next()
                }
                if (!ctx.context.req.user) await next();
            }
        }
    }
    return await next();
};