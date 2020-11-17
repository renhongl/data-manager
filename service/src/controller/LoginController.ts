


import { Request, Response, NextFunction } from 'express';
import { get, post, controller, use } from '../decorator';
import { getResponseData, checkLogin } from '../utils/util';

const user = {
    userName: 'admin',
    password: '112233',
};


@controller('/core')
export class LoginController {

    static isLogin(req: Request): boolean {
        return !!(req.session ? req.session.login : false);
    }

    @get('/isLogin')
    isLogin(req: Request, res: Response) {
        const isLogin = LoginController.isLogin(req);
        if (isLogin) {
            res.json(getResponseData({
                userName: user.userName,
                avator: 'http://localhost:7001/images/avator1.png',
            }));
        } else {
            res.json(getResponseData(false));
        }
    }

    @post('/login')
    login(req: Request, res: Response) {
        const { username, password } = req.body;
        if (LoginController.isLogin(req)) {
            res.send(getResponseData(true));
        } else {
            if (username === user.userName && password === user.password && req.session) {
                req.session.login = true;
                res.json(getResponseData(true));
            } else {
                res.json(getResponseData(false, '登陆失败'));
            }
        }
    }

    @get('/logout')
    logout(req: Request, res: Response) {
        if (req.session) {
            req.session.login = undefined;
        }
        res.json(getResponseData(true));
    }

    @get('/')
    home(req: Request, res: Response) {
        if (LoginController.isLogin(req)) {
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
    }
}






















