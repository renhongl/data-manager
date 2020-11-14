"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoAnalyzer = void 0;
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var DemoAnalyzer = /** @class */ (function () {
    function DemoAnalyzer() {
    }
    DemoAnalyzer.getInstance = function () {
        if (!DemoAnalyzer.instance) {
            DemoAnalyzer.instance = new DemoAnalyzer();
        }
        return DemoAnalyzer.instance;
    };
    DemoAnalyzer.prototype.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var course = [];
        var items = $('.course-item');
        items.each(function (i, ele) {
            var desc = $(ele).find('.course-desc');
            var img = $(ele).find('.course-img');
            course.push({
                title: desc.text(),
                image: img.attr('src') || '',
            });
        });
        return {
            time: new Date().getTime(),
            data: course
        };
    };
    DemoAnalyzer.prototype.generateJson = function (result, filePath) {
        var content = {};
        if (fs_1.default.existsSync(filePath)) {
            content = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        content[result.time] = result.data;
        return content;
    };
    DemoAnalyzer.prototype.analyze = function (html, filePath) {
        var result = this.getCourseInfo(html);
        var content = this.generateJson(result, filePath);
        return JSON.stringify(content);
    };
    return DemoAnalyzer;
}());
exports.DemoAnalyzer = DemoAnalyzer;
