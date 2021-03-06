
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

import './controller';
import { router } from './router';


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieSession({
    name: 'session',
    keys: ['node-spider'],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use(express.static('static'));

app.use(router);

app.listen(7001, () => {
    console.log('server is running at http://lcoalhost:7001');
});
