

import { Analyzer } from './crowller';
import cheerio from 'cheerio';
import fs from 'fs';
import { Builder, By, Key, until } from 'selenium-webdriver';

interface TouTiaoDetail {
    title: string;
}

interface TouTiaoResult {
    name: string;
    data: TouTiaoDetail;
}

interface Content {
    [propName: string]: TouTiaoDetail
}

export class ToutiaoDetailAnalyzer implements Analyzer {

    private static instance: ToutiaoDetailAnalyzer;

    public static getInstance() {
        if (!ToutiaoDetailAnalyzer.instance) {
            ToutiaoDetailAnalyzer.instance = new ToutiaoDetailAnalyzer();
        }
        return ToutiaoDetailAnalyzer.instance;
    }

    private constructor() { }

    private async getInfo(html: string, url: string) {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            await driver.get(url);
            await driver.manage().setTimeouts( { implicit: 10000 } );
            const content = await driver.findElement(By.css('.article-content'));
            console.log(content.getText());
            console.log(await content.getAttribute('textContent'));
        }
        finally {
            driver.quit();
        }
    }

    private generateJson(result: TouTiaoResult, filePath: string) {
        let content: Content = {};
        if (fs.existsSync(filePath)) {
            content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
        content[result.name] = result.data;
        return content;
    }

    analyze(html: string, filePath: string, url: string = '') {
        const result = this.getInfo(html, url);
        const json = this.generateJson({
            name: '',
            data: {
                title: ''
            }
        }, filePath);
        return JSON.stringify(json);
    }
}