"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToutiaoAnalyzer = void 0;
var fs_1 = __importDefault(require("fs"));
var ToutiaoAnalyzer = /** @class */ (function () {
    function ToutiaoAnalyzer() {
    }
    ToutiaoAnalyzer.getInstance = function () {
        if (!ToutiaoAnalyzer.instance) {
            ToutiaoAnalyzer.instance = new ToutiaoAnalyzer();
        }
        return ToutiaoAnalyzer.instance;
    };
    ToutiaoAnalyzer.prototype.getInfo = function (html, url) {
        var json = JSON.parse(html).data;
        return {
            time: new Date().getTime(),
            data: json.map(function (item) { return ({
                url: 'https://www.toutiao.com' + item.open_url,
                groupId: item.group_id,
                title: item.title,
                image: item.image_url
            }); })
        };
    };
    ToutiaoAnalyzer.prototype.generateJson = function (result, filePath) {
        var content = {};
        if (fs_1.default.existsSync(filePath)) {
            content = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        content[result.time] = result.data;
        return content;
    };
    ToutiaoAnalyzer.prototype.analyze = function (html, filePath, url) {
        if (url === void 0) { url = ''; }
        var result = this.getInfo(html, url);
        var json = this.generateJson(result, filePath);
        return JSON.stringify(json);
    };
    return ToutiaoAnalyzer;
}());
exports.ToutiaoAnalyzer = ToutiaoAnalyzer;
