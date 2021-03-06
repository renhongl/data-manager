"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeiboController = void 0;
var decorator_1 = require("../decorator");
var util_1 = require("../utils/util");
var dubokuAnalyzer_1 = require("../utils/dubokuAnalyzer");
var crowller_1 = require("../utils/crowller");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var WeiboController = /** @class */ (function () {
    function WeiboController() {
    }
    /**
     * @api {get} /duboku/pull 拉取新数据
     * @apiName pullDuboku
     * @apiGroup 独播库
     *
     * @apiSuccess {Boolean} success 接口请求是否成功
     * @apiSuccess {Boolean} data 是否成功拉取数据
     *
     * @apiSuccessExample 成功的响应:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": true,
     *       "data": true
     *     }
     */
    WeiboController.prototype.pullData = function (req, res) {
        var fileName = 'duboku';
        var url = 'https://www.duboku.co';
        var analyzer = dubokuAnalyzer_1.DubokuAnalyzer.getInstance();
        new crowller_1.Crowller(url, fileName, analyzer);
        console.log('Pulled new data from duboku website');
        res.json(util_1.getResponseData(true));
    };
    /**
     * @api {get} /duboku 获取独播库数据
     * @apiName getDuboku
     * @apiGroup 独播库
     *
     * @apiSuccess {Boolean} success 接口请求是否成功
     * @apiSuccess {Boolean} data 独播库数据数组
     *
     * @apiSuccessExample 成功的响应:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": true,
     *       "data": true
     *     }
     */
    WeiboController.prototype.getData = function (req, res) {
        try {
            var filePath = path_1.default.resolve(__dirname, '../../data/duboku.json');
            var result = fs_1.default.readFileSync(filePath, 'utf-8');
            res.json(util_1.getResponseData(JSON.parse(result)));
        }
        catch (error) {
            res.send(util_1.getResponseData(false, '没有数据'));
        }
    };
    __decorate([
        decorator_1.get('/pull'),
        decorator_1.use(util_1.checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], WeiboController.prototype, "pullData", null);
    __decorate([
        decorator_1.get('/'),
        decorator_1.use(util_1.checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], WeiboController.prototype, "getData", null);
    WeiboController = __decorate([
        decorator_1.controller('/duboku')
    ], WeiboController);
    return WeiboController;
}());
exports.WeiboController = WeiboController;
