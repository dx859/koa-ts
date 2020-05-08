import Router from '@koa/router';
import { formatPathSlash } from '../utils/common';

const router = new Router();

const pathkeys = Symbol('middlewares');

export function Controller(prefix: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    let paths: Array<string> = constructor.prototype[pathkeys]
      ? constructor.prototype[pathkeys]
      : [];

    for (let key of paths) {
      let [method, path, funcKey] = key.split(' ');
      path = formatPathSlash(prefix) + formatPathSlash(path);
      let funcs = constructor.prototype[funcKey];
      funcs = Array.isArray(funcs) ? funcs : [funcs];

      router[method](path, ...funcs);
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
      target[pathkeys] = target[pathkeys] ? target[pathkeys] : [];

      target[pathkeys].push(
        method + ' ' + formatPathSlash(path) + ' ' + propertyKey,
      );

      return descriptor;
    };
  };
}

export const Get = Method('get');
export const Post = Method('post');
export const All = Method('all');
export { router };
