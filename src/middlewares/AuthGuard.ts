import { Context, Next } from 'koa';
import GenarateDecorator from '../core/GenarateDecorator';

export default GenarateDecorator(function (ctx: Context, next: Next) {
  return next();
});
