import Koa from 'koa';
import koaBody from 'koa-body';
import './controllers/user';
import { router } from './core/RouteRegister';
const app = new Koa();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});
app.use(koaBody());
// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(4000);
