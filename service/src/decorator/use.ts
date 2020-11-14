





import 'reflect-metadata';
import { RequestHandler } from 'express';

export function use(middleware: RequestHandler) {
    return function(target: any, key: string) {
        const middlewares = Reflect.getMetadata('middlewares', target, key) || [];
        middlewares.push(middleware);
        Reflect.defineMetadata('middlewares', middlewares, target, key);
    }
}

