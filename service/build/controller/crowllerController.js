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
var decorators_1 = require("./decorators");
var util_1 = require("../utils/util");
var courseAnalyzer_1 = require("../utils/courseAnalyzer");
var crowller_1 = require("../utils/crowller");
var CrowllerController = /** @class */ (function () {
    function CrowllerController() {
    }
    CrowllerController.prototype.logout = function (req, res) {
        var fileName = 'course';
        var url = 'http://www.dell-lee.com/';
        var analyzer = courseAnalyzer_1.CourseAnalyzer.getInstance();
        new crowller_1.Crowller(url, fileName, analyzer);
        console.log('Pulled new data from website');
        res.json(util_1.getResponseData(null));
    };
    __decorate([
        decorators_1.get('/crowllerCourse'),
        decorators_1.use(util_1.checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "logout", null);
    CrowllerController = __decorate([
        decorators_1.controller
    ], CrowllerController);
    return CrowllerController;
}());
