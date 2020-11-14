import superagent from 'superagent';
import path from 'path';
import fs from 'fs';

export interface Analyzer {
    analyze: (html: string, filePath: string) => string;
}

export class Crowller {

    private filePath = '';
    
    constructor(private url: string, private fileName: string, private analyzer: Analyzer) {
        this.filePath = path.resolve(__dirname, `../../data/${fileName}.json`);
        this.initSpiderProcess();
    }

    private async initSpiderProcess() {
        const html = await this.getRawHtml();
        const content = this.analyzer.analyze(html, this.filePath);
        this.writeFile(content);
    }

    private writeFile(content: string) {
        fs.writeFileSync(this.filePath, content);
    }
    
    private async getRawHtml() {
        const result = await superagent.get(this.url);
        return result.text;
    }
    
}




















