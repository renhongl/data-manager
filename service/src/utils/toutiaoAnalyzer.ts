

import { Analyzer } from './crowller';
import cheerio from 'cheerio';
import fs from 'fs';

interface TouTiao {
    url: string;
    image: string;
    groupId: string;
    title: string;
}

interface TouTiaoResult {
    time: number;
    data: TouTiao[];
}

interface Content {
    [propName: number]: TouTiao[]
}

export class ToutiaoAnalyzer implements Analyzer {

    private static instance: ToutiaoAnalyzer;

    public static getInstance() {
        if (!ToutiaoAnalyzer.instance) {
            ToutiaoAnalyzer.instance = new ToutiaoAnalyzer();
        }
        return ToutiaoAnalyzer.instance;
    }

    private constructor() {}

    private getInfo(html: string, url: string) {
        const json = JSON.parse(html).data;
        return {
            time: new Date().getTime(),
            data: json.map((item: any) => ({
                url: 'https://www.toutiao.com' + item.open_url,
                groupId: item.group_id,
                title: item.title,
                image: item.image_url
            }))
        }
    }

    private generateJson(result: TouTiaoResult, filePath: string) {
        let content: Content = {};
        if (fs.existsSync(filePath)) {
            content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
        content[result.time] = result.data;
        return content;
    }

    analyze(html: string, filePath: string, url: string = '') {
        const result = this.getInfo(html, url);
        const json = this.generateJson(result, filePath);
        return JSON.stringify(json);
    }
}