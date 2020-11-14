



import 'reflect-metadata';
import { router } from '../router';
import { Methods } from './request';
import { RequestHandler } from 'express';

export function controller(prefix: string) {
    return function (target: new (...args: any[]) => any) {
        for(let key in target.prototype) {
            const path: string = Reflect.getMetadata('path', target.prototype, key);
            const method: Methods = Reflect.getMetadata('method', target.prototype, key);
            const middlewares: RequestHandler[] = Reflect.getMetadata('middleware', target.prototype, key);
            const handler = target.prototype[key];
            let url = prefix === '/' ? '/api' + path : '/api' + prefix + path;
            console.log(method, url);
            if (path && method) {
                if (middlewares && middlewares.length) {
                    router[method](url, ...middlewares, handler);
                } else {
                    router[method](url, handler);
                }
            }
        }
    }
}
