import { Component, OnInit } from '@angular/core';
import { DubokuService } from './duboku.service';

@Component({
  selector: 'app-duboku',
  templateUrl: './duboku.component.html',
  styleUrls: ['./duboku.component.scss']
})
export class DubokuComponent implements OnInit {

  data = [];

  constructor(private ser: DubokuService) { }

  ngOnInit(): void {
    this.ser.getData().subscribe((result: any) => {
      if (result.data) {
        const data = result.data;
        const len = Object.keys(data).length;
        const latest = data[Object.keys(data)[len - 1]];
        this.data = latest;
      }
    });
  }

  openTv(tv) {
    window.open(tv.url, '_blank');
  }

}
