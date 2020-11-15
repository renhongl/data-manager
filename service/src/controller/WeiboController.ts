


import { Request, Response } from 'express';
import { get, post, controller, use } from '../decorator';
import { getResponseData, checkLogin } from '../utils/util';
import { WeiboAnalyzer } from '../utils/weiboAnalyzer';
import { Crowller } from '../utils/crowller';
import fs from 'fs';
import path from 'path';

@controller('/weibo')
export class WeiboController {

    @get('/pull')
    @use(checkLogin)
    pullData(req: Request, res: Response) {
        const fileName = 'weibo';
        const url = 'https://d.weibo.com/231650';
        const analyzer = WeiboAnalyzer.getInstance();
        new Crowller(url, fileName, analyzer);
        console.log('Pulled new data from weibo website');
        res.json(getResponseData(true));
    }

    
}






















