import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { PrismaService } from "../../database/prisma.service";

export const AuthMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
        const auth = ctx.context.req.cookies['authorization'] || ctx.context.req.headers.authorization;
        let prismaService = new PrismaService();
        if (!!auth) {
            let token = auth.split(' ')[1];
            let email = token.email
            if (!!email) {
                let user = await prismaService.user.findUnique({where: {email}});
                if (!!user) {
                    console.log(user);
                    ctx.context.req.user = user;
                }
                if (!ctx.context.req.user) next();
            } 
        }
        return next();

};