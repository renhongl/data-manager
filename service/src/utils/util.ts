


import { Request, Response, NextFunction } from 'express';

interface Result {
    success: boolean;
    errMsg?: string;
    data: any;
}

export const getResponseData = (data: any, errMsg?: string): Result => {
    if (errMsg) {
        return {
            success: false,
            errMsg,
            data,
        }
    }
    return {
        success: true,
        data,
    };
}

export const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
    const isLogin = !!(req.session ? req.session.login : false);
    if (isLogin) {
        next();
    } else {
        res.json(getResponseData(null, '请先登陆'));
    }
}







