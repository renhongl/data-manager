"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeiboAnalyzer = void 0;
var cheerio_1 = __importDefault(require("cheerio"));
var WeiboAnalyzer = /** @class */ (function () {
    function WeiboAnalyzer() {
    }
    WeiboAnalyzer.getInstance = function () {
        if (!WeiboAnalyzer.instance) {
            WeiboAnalyzer.instance = new WeiboAnalyzer();
        }
        return WeiboAnalyzer.instance;
    };
    WeiboAnalyzer.prototype.getInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var items = $('.pt_li');
        console.log(items.length);
    };
    WeiboAnalyzer.prototype.analyze = function (html) {
        this.getInfo(html);
        return html;
    };
    return WeiboAnalyzer;
}());
exports.WeiboAnalyzer = WeiboAnalyzer;
