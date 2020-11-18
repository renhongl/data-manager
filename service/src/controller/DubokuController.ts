


import { Request, Response } from 'express';
import { get, post, controller, use } from '../decorator';
import { getResponseData, checkLogin } from '../utils/util';
import { DubokuAnalyzer } from '../utils/dubokuAnalyzer';
import { Crowller } from '../utils/crowller';
import fs from 'fs';
import path from 'path';

@controller('/duboku')
export class WeiboController {

    /**
     * @api {get} /duboku/pull 拉取新数据
     * @apiName pullDuboku
     * @apiGroup 独播库
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
    @get('/pull')
    @use(checkLogin)
    pullData(req: Request, res: Response) {
        const fileName = 'duboku';
        const url = 'https://www.duboku.co';
        const analyzer = DubokuAnalyzer.getInstance();
        new Crowller(url, fileName, analyzer);
        console.log('Pulled new data from duboku website');
        res.json(getResponseData(true));
    }

    /**
     * @api {get} /duboku 获取独播库数据
     * @apiName getDuboku
     * @apiGroup 独播库
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
    @get('/')
    @use(checkLogin)
    getData(req: Request, res: Response) {
        try {
            const filePath = path.resolve(__dirname, '../../data/duboku.json');
            const result = fs.readFileSync(filePath, 'utf-8');
            res.json(getResponseData(JSON.parse(result)));
        } catch (error) {
            res.send(getResponseData(false, '没有数据'));
        }
    }
}






















