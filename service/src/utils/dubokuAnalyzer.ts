

import { Analyzer } from './crowller';
import cheerio from 'cheerio';
import fs from 'fs';

interface TV {
    title: string;
    image: string;
    url: string;
    score: string;
    actors: string;
    subtitle: string;
}

interface TVResult {
    time: number;
    data: TV[];
}

interface Content {
    [propName: number]: TV[]
}

export class DubokuAnalyzer implements Analyzer {

    private static instance: DubokuAnalyzer;

    public static getInstance() {
        if (!DubokuAnalyzer.instance) {
            DubokuAnalyzer.instance = new DubokuAnalyzer();
        }
        return DubokuAnalyzer.instance;
    }

    private constructor() {}

    private getInfo(html: string, rootUrl: string): TVResult{
        const $ = cheerio.load(html);
        const items = $('.myui-vodlist li');
        const result: TV[] = [];
        items.each((index, item) => {
            const title = $(item).find('a').attr('title') || '';
            const image = $(item).find('a').attr('data-original') || '';
            const url = rootUrl + ($(item).find('a').attr('href') || '');
            const score = $(item).find('.tag').text() || '';
            const actors = $(item).find('.text.text-overflow.text-muted.hidden-xs').text() || '';
            const subtitle = $(item).find('.pic-text.text-right').text() || '';
            result.push({
                title,
                image,
                url,
                score,
                actors,
                subtitle,
            });
        });
        return {
            time: new Date().getTime(),
            data: result,
        };
    }

    private generateJson(result: TVResult, filePath: string) {
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