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
exports.CourseController = void 0;
var decorator_1 = require("../decorator");
var util_1 = require("../utils/util");
var courseAnalyzer_1 = require("../utils/courseAnalyzer");
var crowller_1 = require("../utils/crowller");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var CourseController = /** @class */ (function () {
    function CourseController() {
    }
    CourseController.prototype.update = function (req, res) {
        var fileName = 'course';
        var url = 'http://www.dell-lee.com/';
        var analyzer = courseAnalyzer_1.CourseAnalyzer.getInstance();
        new crowller_1.Crowller(url, fileName, analyzer);
        console.log('Pulled new data from course website');
        res.json(util_1.getResponseData(true));
    };
    CourseController.prototype.getData = function (req, res) {
        try {
            var filePath = path_1.default.resolve(__dirname, '../../data/course.json');
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
    ], CourseController.prototype, "update", null);
    __decorate([
        decorator_1.get('/'),
        decorator_1.use(util_1.checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CourseController.prototype, "getData", null);
    CourseController = __decorate([
        decorator_1.controller('/course')
    ], CourseController);
    return CourseController;
}());
exports.CourseController = CourseController;
