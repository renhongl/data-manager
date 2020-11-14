"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLogin = exports.getResponseData = void 0;
exports.getResponseData = function (data, errMsg) {
    if (errMsg) {
        return {
            success: false,
            errMsg: errMsg,
            data: data,
        };
    }
    return {
        success: true,
        data: data,
    };
};
exports.checkLogin = function (req, res, next) {
    var isLogin = !!(req.session ? req.session.login : false);
    if (isLogin) {
        next();
    }
    else {
        res.json(exports.getResponseData(null, '请先登陆'));
    }
};
