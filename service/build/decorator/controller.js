"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var router_1 = require("../router");
function controller(prefix) {
    return function (target) {
        for (var key in target.prototype) {
            var path = Reflect.getMetadata('path', target.prototype, key);
            var method = Reflect.getMetadata('method', target.prototype, key);
            var middlewares = Reflect.getMetadata('middleware', target.prototype, key);
            var handler = target.prototype[key];
            var url = prefix === '/' ? '/api' + path : '/api' + prefix + path;
            console.log(method, url);
            if (path && method) {
                if (middlewares && middlewares.length) {
                    router_1.router[method].apply(router_1.router, __spreadArrays([url], middlewares, [handler]));
                }
                else {
                    router_1.router[method](url, handler);
                }
            }
        }
    };
}
exports.controller = controller;
