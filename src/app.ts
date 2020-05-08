import Koa from 'koa';
import koaBody from 'koa-body';
import './core/ControllerRegister';
import { router } from './core/RouteRegister';

const app = new Koa();

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(koaBody());
// response

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(4000);
