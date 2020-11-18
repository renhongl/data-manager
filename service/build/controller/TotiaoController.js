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
exports.ToutiaoController = void 0;
var decorator_1 = require("../decorator");
var util_1 = require("../utils/util");
var toutiaoAnalyzer_1 = require("../utils/toutiaoAnalyzer");
var crowller_1 = require("../utils/crowller");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var ToutiaoController = /** @class */ (function () {
    function ToutiaoController() {
    }
    /**
     * @api {get} /toutiao/pull 拉取新数据
     * @apiName pullToutiao
     * @apiGroup 头条
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
    ToutiaoController.prototype.pullData = function (req, res) {
        var fileName = 'toutiao';
        var url = 'https://www.toutiao.com/api/pc/realtime_news';
        var analyzer = toutiaoAnalyzer_1.TaotiaoAnalyzer.getInstance();
        new crowller_1.Crowller(url, fileName, analyzer);
        console.log('Pulled new data from toutiao website');
        res.json(util_1.getResponseData(true));
    };
    /**
     * @api {get} /toutiao 获取头条数据
     * @apiName getToutiao
     * @apiGroup 头条
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
    ToutiaoController.prototype.getData = function (req, res) {
        try {
            var filePath = path_1.default.resolve(__dirname, '../../data/toutiao.json');
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
    ], ToutiaoController.prototype, "pullData", null);
    __decorate([
        decorator_1.get('/'),
        decorator_1.use(util_1.checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], ToutiaoController.prototype, "getData", null);
    ToutiaoController = __decorate([
        decorator_1.controller('/toutiao')
    ], ToutiaoController);
    return ToutiaoController;
}());
exports.ToutiaoController = ToutiaoController;
