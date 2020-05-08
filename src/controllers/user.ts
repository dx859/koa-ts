import { Controller, Get } from '../core/RouteRegister';
import { Context } from 'koa';

@Controller('user')
class Greeter {
  property = 'property';
  hello = 'name';

  findOne() {}

  @Get('')
  find(ctx: Context) {
    ctx.body = 'hello';
  }
}
