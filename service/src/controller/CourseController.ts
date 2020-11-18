


import { Request, Response } from 'express';
import { get, post, controller, use } from '../decorator';
import { getResponseData, checkLogin } from '../utils/util';
import { CourseAnalyzer } from '../utils/courseAnalyzer';
import { Crowller } from '../utils/crowller';
import fs from 'fs';
import path from 'path';


@controller('/course')
export class CourseController {

    /**
     * @api {get} /course/pull 拉取新数据
     * @apiName pullCourse
     * @apiGroup 课程
     *
     * @apiSuccess {Boolean} success 接口请求是否成功
     * @apiSuccess {Boolean} data 是否拉取数据成功
     *
     * @apiSuccessExample 成功的响应:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": true,
     *       "data": true
     *     }
     */
    @get('/pull')
    @use(checkLogin)
    pullData(req: Request, res: Response) {
        const fileName = 'course';
        const url = 'http://www.dell-lee.com';
        const analyzer = CourseAnalyzer.getInstance();
        new Crowller(url, fileName, analyzer);
        console.log('Pulled new data from course website');
        res.json(getResponseData(true));
    }

    /**
     * @api {get} /course 获取课程数据
     * @apiName getCourse
     * @apiGroup 课程
     *
     * @apiSuccess {Boolean} success 接口请求是否成功
     * @apiSuccess {Array} data 课程数据数组
     *
     * @apiSuccessExample 成功的响应:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": true,
     *       "data": []
     *     }
     */
    @get('/')
    @use(checkLogin)
    getData(req: Request, res: Response) {
        try {
            const filePath = path.resolve(__dirname, '../../data/course.json');
            const result = fs.readFileSync(filePath, 'utf-8');
            res.json(getResponseData(JSON.parse(result)));
        } catch (error) {
            res.send(getResponseData(false, '没有数据'));
        }
    }

}






















