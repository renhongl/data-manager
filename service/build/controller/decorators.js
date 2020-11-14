"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = exports.catchError = exports.use = exports.controller = void 0;
require("reflect-metadata");
var router_1 = require("../router");
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
})(Methods || (Methods = {}));
function controller(prefix) {
    return function (target) {
        for (var key in target.prototype) {
            var path = Reflect.getMetadata('path', target.prototype, key);
            var method = Reflect.getMetadata('method', target.prototype, key);
            var middleware = Reflect.getMetadata('middleware', target.prototype, key);
            var handler = target.prototype[key];
            if (path && method && handler) {
                if (middleware) {
                    router_1.router[method](prefix + path, middleware, handler);
                }
                else {
                    router_1.router[method](prefix + path, handler);
                }
            }
        }
    };
}
exports.controller = controller;
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
function use(middleware) {
    return function (target, key) {
        Reflect.defineMetadata('middleware', middleware, target, key);
    };
}
exports.use = use;
function catchError(msg) {
    return function catchError(target, key, descriptor) {
        console.log(key);
        var fn = descriptor.value;
        descriptor.value = function () {
            try {
                fn();
            }
            catch (error) {
                console.log(msg);
            }
        };
    };
}
exports.catchError = catchError;
exports.get = getRequestDecorator(Methods.get);
exports.post = getRequestDecorator(Methods.post);
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
