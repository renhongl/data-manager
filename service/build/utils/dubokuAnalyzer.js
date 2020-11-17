"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DubokuAnalyzer = void 0;
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var DubokuAnalyzer = /** @class */ (function () {
    function DubokuAnalyzer() {
    }
    DubokuAnalyzer.getInstance = function () {
        if (!DubokuAnalyzer.instance) {
            DubokuAnalyzer.instance = new DubokuAnalyzer();
        }
        return DubokuAnalyzer.instance;
    };
    DubokuAnalyzer.prototype.getInfo = function (html, rootUrl) {
        var $ = cheerio_1.default.load(html);
        var items = $('.myui-vodlist li');
        var result = [];
        items.each(function (index, item) {
            var title = $(item).find('a').attr('title') || '';
            var image = $(item).find('a').attr('data-original') || '';
            var url = rootUrl + ($(item).find('a').attr('href') || '');
            var score = $(item).find('.tag').text() || '';
            var actors = $(item).find('.text.text-overflow.text-muted.hidden-xs').text() || '';
            var subtitle = $(item).find('.pic-text.text-right').text() || '';
            result.push({
                title: title,
                image: image,
                url: url,
                score: score,
                actors: actors,
                subtitle: subtitle,
            });
        });
        return {
            time: new Date().getTime(),
            data: result,
        };
    };
    DubokuAnalyzer.prototype.generateJson = function (result, filePath) {
        var content = {};
        if (fs_1.default.existsSync(filePath)) {
            content = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        content[result.time] = result.data;
        return content;
    };
    DubokuAnalyzer.prototype.analyze = function (html, filePath, url) {
        if (url === void 0) { url = ''; }
        var result = this.getInfo(html, url);
        var json = this.generateJson(result, filePath);
        return JSON.stringify(json);
    };
    return DubokuAnalyzer;
}());
exports.DubokuAnalyzer = DubokuAnalyzer;
