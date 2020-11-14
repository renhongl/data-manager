"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var courseAnalyzer_1 = require("./utils/courseAnalyzer");
var crowller_1 = require("./utils/crowller");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var util_1 = require("./utils/util");
var checkLogin = function (req, res, next) {
    var isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        next();
    }
    else {
        res.json(util_1.getResponseData(null, '请先登陆'));
    }
};
var router = express_1.Router();
router.get('/', function (req, res) {
    var isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        res.send("\n            <a href=\"/getData\">\u722C\u53D6\u6570\u636E</a>\n            <a href=\"/course\">\u5C55\u793A\u8BFE\u7A0B\u6570\u636E</a>\n            <a href=\"/logout\">\u9000\u51FA</a>\n        ");
    }
    else {
        res.send("\n            <h4>\u722C\u53D6\u65B0\u6570\u636E</h4>\n            <form method=\"post\" action=\"/login\">\n                <input type=\"password\" name=\"password\"/>\n                <button type=\"submit\">\u767B\u9646</button>\n            </form>\n        ");
    }
});
router.get('/logout', function (req, res) {
    if (req.session) {
        req.session.login = undefined;
    }
    res.json(util_1.getResponseData(null));
});
router.post('/login', function (req, res) {
    var password = req.body.password;
    var isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        res.send(util_1.getResponseData(null, '已经登陆过'));
    }
    else {
        if (password === '112233' && req.session) {
            req.session.login = true;
            res.json(util_1.getResponseData(null));
        }
        else {
            res.json(util_1.getResponseData(null, '登陆失败'));
        }
    }
});
router.get('/getData', checkLogin, function (req, res) {
    var fileName = 'course';
    var url = 'http://www.dell-lee.com/';
    var analyzer = courseAnalyzer_1.CourseAnalyzer.getInstance();
    new crowller_1.Crowller(url, fileName, analyzer);
    console.log('Pulled new data from website');
    res.json(util_1.getResponseData(null));
});
router.get('/course', checkLogin, function (req, res) {
    try {
        var filePath = path_1.default.resolve(__dirname, '../data/course.json');
        var result = fs_1.default.readFileSync(filePath, 'utf-8');
        res.json(util_1.getResponseData(JSON.parse(result)));
    }
    catch (error) {
        res.send(util_1.getResponseData(null, '没有数据'));
    }
});
exports.default = router;
