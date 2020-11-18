"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseAnalyzer = void 0;
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var CourseAnalyzer = /** @class */ (function () {
    function CourseAnalyzer() {
    }
    CourseAnalyzer.getInstance = function () {
        if (!CourseAnalyzer.instance) {
            CourseAnalyzer.instance = new CourseAnalyzer();
        }
        return CourseAnalyzer.instance;
    };
    CourseAnalyzer.prototype.getCourseInfo = function (html, url) {
        var $ = cheerio_1.default.load(html);
        var course = [];
        var items = $('.course-item');
        items.each(function (i, ele) {
            var desc = $(ele).find('.course-desc');
            var img = $(ele).find('.course-img');
            course.push({
                title: desc.text(),
                image: url + img.attr('src') || '',
                count: Math.round(Math.random() * 100 + 20),
            });
        });
        return {
            time: new Date().getTime(),
            data: course
        };
    };
    CourseAnalyzer.prototype.generateJson = function (result, filePath) {
        var content = {};
        if (fs_1.default.existsSync(filePath)) {
            content = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        content[result.time] = result.data;
        return content;
    };
    CourseAnalyzer.prototype.analyze = function (html, filePath, url) {
        if (url === void 0) { url = ''; }
        var result = this.getCourseInfo(html, url);
        var content = this.generateJson(result, filePath);
        return JSON.stringify(content);
    };
    return CourseAnalyzer;
}());
exports.CourseAnalyzer = CourseAnalyzer;
