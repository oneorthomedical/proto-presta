import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import {MaterialModule} from "@app/shared/module/material.module";
import {AppRoutingModule} from "@app/app-routing.module";



@NgModule({
  declarations: [ToolbarComponent],
  exports: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ]
})
export class ToolbarModule { }
