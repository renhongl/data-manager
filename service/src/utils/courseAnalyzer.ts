
import cheerio from 'cheerio';
import fs from 'fs';
import { Analyzer } from './crowller';

interface Course {
    title: string;
    image: string;
    count: number;
}

interface CourseResult {
    time: number;
    data: Course[];
}

interface Content {
    [propName: number]: Course[]
}

export class CourseAnalyzer implements Analyzer{

    private static instance: CourseAnalyzer;

    public static getInstance() {
        if (!CourseAnalyzer.instance) {
            CourseAnalyzer.instance = new CourseAnalyzer();
        }
        return CourseAnalyzer.instance;
    }

    private constructor() {}

    private getCourseInfo(html: string) {
        const $ = cheerio.load(html);
        const course: Course[] = [];
        const items = $('.course-item');
        items.each((i, ele) => {
            const desc = $(ele).find('.course-desc');
            const img = $(ele).find('.course-img');
            course.push({
                title: desc.text(),
                image: img.attr('src') || '',
                count: Math.round(Math.random() * 100 + 20),
            });
        });
        return {
            time: new Date().getTime(),
            data: course
        }
    }

    private generateJson(result: CourseResult, filePath: string) {
        let content: Content = {};
        if (fs.existsSync(filePath)) {
            content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
        content[result.time] = result.data;
        return content;
    }

    public analyze(html: string, filePath: string) {
        const result = this.getCourseInfo(html);
        const content = this.generateJson(result, filePath);
        return JSON.stringify(content);
    }

}












