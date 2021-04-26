import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DisplayScreenComponent} from "@app/ui/display-screen/display-screen.component";
import {MaterialModule} from "@app/shared/module/material.module";
import { DisplayscreenView1Component } from './displayscreen-view1/displayscreen-view1.component';
import { DisplayscreenView2Component } from './displayscreen-view2/displayscreen-view2.component';

@NgModule({
  declarations: [
    DisplayScreenComponent,
    DisplayscreenView1Component,
    DisplayscreenView2Component,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    DisplayScreenComponent
  ]
})
export class DisplayScreenModule {
}
