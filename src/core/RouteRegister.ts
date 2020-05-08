import Router from '@koa/router';
import { formatPathSlash } from '../utils/common';

const router = new Router();

const middlewares = Symbol('middlewares');

export function Controller(prefix: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    let pathMap: LooseObject = constructor.prototype[middlewares]
      ? constructor.prototype[middlewares]
      : {};

    for (let key in pathMap) {
      let [method, path] = key.split(' ');
      path = formatPathSlash(prefix) + formatPathSlash(path);
      router[method](path, ...pathMap[key]);
    }
  };
}

function Method(method: 'get' | 'post' | 'all' = 'get') {
  return function (path: string = '') {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {
      target[middlewares] = target[middlewares] ? target[middlewares] : {};
      if (target[middlewares][propertyKey]) {
        target[middlewares][method + ' ' + path].push(target[propertyKey]);
      } else {
        target[middlewares][method + ' ' + path] = [target[propertyKey]];
      }
    };
  };
}

export const Get = Method('get');
export const Post = Method('post');
export const All = Method('all');
export { router };
