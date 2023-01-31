import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { PrismaService } from "../../database/prisma.service";
import jwtDecode from 'jwt-decode';

export const AuthMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
        const auth = ctx.context.req.cookies['authorization'] || ctx.context.req.headers.authorization;
        let prismaService = new PrismaService();
        if (!!auth) {
            const decoded: any = jwtDecode(auth)
            let email = decoded.email
            if (!!email) {
                let user = await prismaService.user.findUnique({where: {email}});
                console.log(user)
                if (!!user) {
                    console.log(user);
                    ctx.context.req.user = user;
                }
                if (!ctx.context.req.user) next();
            } 
        }
        return next();

};