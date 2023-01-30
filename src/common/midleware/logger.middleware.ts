import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const LoggerMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  if (!!ctx.context.req.user) {
    const message = `[${new Date().toLocaleString()}] | [operationName: ${ctx.context.req.body.operationName}] \n ${ctx.context.req.headers['user-agent']}`;
    const args = JSON.stringify(ctx.args);
    const sourse =JSON.stringify( ctx.source);
    console.log("midleware: ", ctx.source);
    return null;
  }
  return null
};