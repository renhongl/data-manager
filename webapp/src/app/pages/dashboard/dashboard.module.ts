import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { AntdModule } from '../../shared/antd.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AntdModule,
  ]
})
export class DashboardModule { }
