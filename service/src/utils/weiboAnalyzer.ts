

import { Analyzer } from './crowller';
import cheerio from 'cheerio';

export class WeiboAnalyzer implements Analyzer {

    private static instance: WeiboAnalyzer;

    public static getInstance() {
        if (!WeiboAnalyzer.instance) {
            WeiboAnalyzer.instance = new WeiboAnalyzer();
        }
        return WeiboAnalyzer.instance;
    }

    private constructor() {}

    private getInfo(html: string) {
        const $ = cheerio.load(html);
        const items = $('.pt_li');
        console.log(items.length);
    }

    analyze(html: string) {
        this.getInfo(html);
        return html;
    }
}