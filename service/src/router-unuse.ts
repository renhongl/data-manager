


import { Router, Request, Response, NextFunction } from 'express';
import { CourseAnalyzer } from './utils/courseAnalyzer';
import { Crowller } from './utils/crowller';
import fs from 'fs';
import path from 'path';
import { getResponseData } from './utils/util';

interface RequestWithBody extends Request {
    body: {
        [key: string]: string | undefined;
    }
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
    const isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        next();
    } else {
        res.json(getResponseData(null, '请先登陆'));
    }
}

const router = Router();

router.get('/', (req: Request, res: Response) => {
    const isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        res.send(`
            <a href="/getData">爬取数据</a>
            <a href="/course">展示课程数据</a>
            <a href="/logout">退出</a>
        `);
    } else {
        res.send(`
            <h4>爬取新数据</h4>
            <form method="post" action="/login">
                <input type="password" name="password"/>
                <button type="submit">登陆</button>
            </form>
        `);
    }
});

router.get('/logout', (req: Request, res: Response) => {
    if (req.session) {
        req.session.login = undefined;
    }
    res.json(getResponseData(null));
});

router.post('/login', (req: RequestWithBody, res: Response) => {
    const { password } = req.body;
    const isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        res.send(getResponseData(null, '已经登陆过'));
    } else {
        if (password === '112233' && req.session) {
            req.session.login = true;
            res.json(getResponseData(null));
        } else {
            res.json(getResponseData(null, '登陆失败'));
        }
    }
});

router.get('/getData', checkLogin, (req: RequestWithBody, res: Response) => {
    const fileName = 'course';
    const url = 'http://www.dell-lee.com/';
    const analyzer = CourseAnalyzer.getInstance();
    new Crowller(url, fileName, analyzer);
    console.log('Pulled new data from website');
    res.json(getResponseData(null));
});

router.get('/course', checkLogin, (req: RequestWithBody, res: Response) => {
    try {
        const filePath = path.resolve(__dirname, '../data/course.json');
        const result = fs.readFileSync(filePath, 'utf-8');
        res.json(getResponseData(JSON.parse(result)));
    } catch (error) {
        res.send(getResponseData(null, '没有数据'));
    }
});

export default router;


















