


import 'reflect-metadata';
import { RequestHandler } from 'express';
import { router } from '../router';

enum Methods {
    get = 'get',
    post = 'post'
}

export function controller(prefix: string) {
    return function (target: any) {
        for(let key in target.prototype) {
            const path = Reflect.getMetadata('path', target.prototype, key);
            const method: Methods = Reflect.getMetadata('method', target.prototype, key);
            const middleware: Methods = Reflect.getMetadata('middleware', target.prototype, key);
            const handler = target.prototype[key];
            if (path && method && handler) {
                if (middleware) {
                    router[method](prefix + path, (middleware as any), handler);
                } else {
                    router[method](prefix + path, handler);
                }
            }
        }
    }
}

function getRequestDecorator(type: string) {
    return function (path: string) {
        return function(target: any, key: string) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        }
    }
}

export function use(middleware: RequestHandler) {
    return function(target: any, key: string) {
        Reflect.defineMetadata('middleware', middleware, target, key);
    }
}

export function catchError(msg: string) {
    return function catchError(target: any, key: string, descriptor: PropertyDescriptor) {
        console.log(key);
        const fn = descriptor.value;
        descriptor.value = function() {
            try {
                fn();
            } catch (error) {
                console.log(msg);
                
            }
        }
    }
}

export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);

// export function get(path: string) {
//     return function(target: any, key: string) {
//         Reflect.defineMetadata('path', path, target, key);
//         Reflect.defineMetadata('method', 'get', target, key);
//     }
// }

// export function post(path: string) {
//     return function(target: any, key: string) {
//         Reflect.defineMetadata('path', path, target, key);
//         Reflect.defineMetadata('method', 'post', target, key);
//     }
// }















