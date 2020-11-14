



export enum Methods {
    GET = 'get',
    POST = 'post'
}

function getRequestDecorator(type: string) {
    return function (path: string) {
        return function(target: any, key: string) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        }
    }
}

export const get = getRequestDecorator(Methods.GET);
export const post = getRequestDecorator(Methods.POST);





