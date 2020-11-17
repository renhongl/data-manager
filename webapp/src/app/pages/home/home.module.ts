import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { AntdModule } from '../../shared/antd.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'course',
        loadChildren: () => import('../course/course.module').then(m => m.CourseModule),
      },
      {
        path: 'duboku',
        loadChildren: () => import('../duboku/duboku.module').then(m => m.DubokuModule),
      },
      {
        path: 'about',
        loadChildren: () => import('../about/about.module').then(m => m.AboutModule),
      }
    ]
  }
];



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AntdModule,
  ]
})
export class HomeModule { }
