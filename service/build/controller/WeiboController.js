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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeiboController = void 0;
var decorator_1 = require("../decorator");
var util_1 = require("../utils/util");
var weiboAnalyzer_1 = require("../utils/weiboAnalyzer");
var crowller_1 = require("../utils/crowller");
var WeiboController = /** @class */ (function () {
    function WeiboController() {
    }
    WeiboController.prototype.pullData = function (req, res) {
        var fileName = 'weibo';
        var url = 'https://d.weibo.com/231650';
        var analyzer = weiboAnalyzer_1.WeiboAnalyzer.getInstance();
        new crowller_1.Crowller(url, fileName, analyzer);
        console.log('Pulled new data from weibo website');
        res.json(util_1.getResponseData(true));
    };
    __decorate([
        decorator_1.get('/pull'),
        decorator_1.use(util_1.checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], WeiboController.prototype, "pullData", null);
    WeiboController = __decorate([
        decorator_1.controller('/weibo')
    ], WeiboController);
    return WeiboController;
}());
exports.WeiboController = WeiboController;
