import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiComponent } from './api.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ApiComponent
  }
];



@NgModule({
  declarations: [ApiComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ApiModule { }
