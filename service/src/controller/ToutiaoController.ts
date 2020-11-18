


import { Request, Response } from 'express';
import { get, post, controller, use } from '../decorator';
import { getResponseData, checkLogin } from '../utils/util';
import { ToutiaoAnalyzer } from '../utils/toutiaoAnalyzer';
import { ToutiaoDetailAnalyzer } from '../utils/toutiaoDetailAnalyzer';
import { Crowller } from '../utils/crowller';
import fs from 'fs';
import path from 'path';

@controller('/toutiao')
export class ToutiaoController {

    /**
     * @api {get} /toutiao/pull 拉取新数据
     * @apiName pullToutiao
     * @apiGroup 头条
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
        const fileName = 'toutiao';
        const url = 'https://www.toutiao.com/api/pc/realtime_news/';
        const analyzer = ToutiaoAnalyzer.getInstance();
        new Crowller(url, fileName, analyzer);
        console.log('Pulled new data from toutiao website');
        res.json(getResponseData(true));
    }

    /**
     * @api {get} /toutiao 获取头条数据
     * @apiName getToutiao
     * @apiGroup 头条
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
            const filePath = path.resolve(__dirname, '../../data/toutiao.json');
            const result = fs.readFileSync(filePath, 'utf-8');
            res.json(getResponseData(JSON.parse(result)));
        } catch (error) {
            res.send(getResponseData(false, '没有数据'));
        }
    }

    @get('/pull/detail/:groupId')
    @use(checkLogin)
    pullDetail(req: Request, res: Response) {
        const { groupId } = req.params;
        const fileName = 'toutiao_detail';
        const url = `https://www.toutiao.com/group/${groupId}/`;
        console.log(url);
        const analyzer = ToutiaoDetailAnalyzer.getInstance();
        new Crowller(url, fileName, analyzer);
        console.log('Pulled new data from toutiao_detail website');
        res.json(getResponseData(true));
    }

    @get('/detail/:groupId')
    @use(checkLogin)
    getDetail(req: Request, res: Response) {
        try {
            const { groupId } = req.params;
            const filePath = path.resolve(__dirname, '../../data/toutiao_detail.json');
            const result = fs.readFileSync(filePath, 'utf-8');
            const json = JSON.parse(result);
            res.json(getResponseData(json[groupId]));
        } catch (error) {
            res.send(getResponseData(false, '没有数据'));
        }
    }
}






















