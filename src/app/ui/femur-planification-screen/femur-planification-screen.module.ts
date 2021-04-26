import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FemurPlanificationScreenComponent} from './femur-planification-screen.component';
import {FemurplanifView1Component} from './femurplanif-view1/femurplanif-view1.component';
import {MaterialModule} from '@app/shared/module/material.module';
import {FemurplanifView4Component} from './femurplanif-view4/femurplanif-view4.component';
import {FemurPadComponent} from './femur-pad/femur-pad.component';


@NgModule({
  declarations: [FemurPlanificationScreenComponent, FemurplanifView1Component, FemurplanifView4Component, FemurPadComponent, FemurPadComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class FemurPlanificationScreenModule {
}
