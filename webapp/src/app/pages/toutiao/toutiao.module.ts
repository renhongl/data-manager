import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToutiaoComponent } from './toutiao.component';
import { Routes, RouterModule } from '@angular/router';
import { AntdModule } from '../../shared/antd.module';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: ToutiaoComponent
  }
];


@NgModule({
  declarations: [ToutiaoComponent, DetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AntdModule,
  ]
})
export class ToutiaoModule { }
