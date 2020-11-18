import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { Routes, RouterModule } from '@angular/router';
import { AntdModule } from '../../shared/antd.module';

const routes: Routes = [
  {
    path: '',
    component: CourseComponent
  }
];


@NgModule({
  declarations: [CourseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AntdModule,
  ]
})
export class CourseModule { }
