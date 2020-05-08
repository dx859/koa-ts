import { Controller, Get } from '../core/RouteRegister';
import { Context } from 'koa';
import AuthGuard from '../middlewares/authGuard';

@Controller('user')
class Greeter {
  @Get()
  @AuthGuard()
  find(ctx: Context) {
    ctx.body = 'hello';
  }
}

// let greeter = new Greeter();
// console.log(greeter.find);
