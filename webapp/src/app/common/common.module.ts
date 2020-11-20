import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreedMapDirective } from './directives';

const DIRECTIVES = [
  ThreedMapDirective,
];

const COMPONENTS = [

];


@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  imports: [
    CommonModule
  ],
  exports: [...COMPONENTS, ...DIRECTIVES]
})
export class CommonMModule { }
