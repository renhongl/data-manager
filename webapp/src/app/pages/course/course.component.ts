import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CourseService } from './course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  data = [];
  time = '';

  constructor(private ser: CourseService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.refresh();
  }

  pullData() {
    this.ser.pullData().subscribe((result: any) => {
      if (result.data) {
        this.message.success('拉取数据成功，请稍后刷新数据');
      } else {
        this.message.error(result.errMsg);
      }
    });
  }

  refresh() {
    this.ser.getData().subscribe((result: any) => {
      if (result.data) {
        const data = result.data;
        const len = Object.keys(data).length;
        const key = Object.keys(data)[len - 1];
        const latest = data[key];
        this.data = latest;
        this.time = new Date(Number(key)).toLocaleString();
      }
    });
  }

}
