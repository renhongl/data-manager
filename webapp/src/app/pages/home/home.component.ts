import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  mode = false;
  dark = false;
  menus = [
    {
      level: 1,
      title: '主页',
      icon: 'home',
      url: '',
      selected: false,
      disabled: false
    },
    {
      level: 1,
      title: '模块',
      icon: 'appstore',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: '课程',
          url: 'course',
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: '独播库',
          url: 'duboku',
          selected: false,
          disabled: false
        }
      ]
    },
    {
      level: 1,
      title: '关于',
      icon: 'user',
      url: 'about',
      selected: false,
      disabled: false
    }
  ];

  current = '';
  loaded = false;

  constructor(
    private router: Router,
    private ser: HomeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.current = this.router.url.replace(/\/|home/g, '');
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.current = event.url.replace(/\/|home/g, '');
        console.log(event.url.replace(/\/|home/g, ''));
      }
    });

    this.ser.isLogin().subscribe((result: any) => {
      if (!result.data) {
        this.router.navigate(['/login']);
      } else {
        this.loaded = true;
      }
    });
  }

  switchPage(e) {
    if (!e.children) {
      this.router.navigate([e.url], { relativeTo: this.route });
    }
  }

  logout() {
    this.ser.logout().subscribe((result: any) => {
      if (result.data) {
        this.router.navigate(['/login']);
      }
    });
  }

}
