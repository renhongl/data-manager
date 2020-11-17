import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DubokuComponent } from './duboku.component';
import { Routes, RouterModule } from '@angular/router';
import { AntdModule } from '../../shared/antd.module';

const routes: Routes = [
  {
    path: '',
    component: DubokuComponent
  }
];

@NgModule({
  declarations: [DubokuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AntdModule
  ]
})
export class DubokuModule { }
