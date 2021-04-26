import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CotylePlanificationScreenComponent} from '@app/ui/cotyle-planification-screen/cotyle-planification-screen.component';
import {CotyleplanifView1Component} from './cotyleplanif-view1/cotyleplanif-view1.component';
import {CotyleplanifView2Component} from './cotyleplanif-view2/cotyleplanif-view2.component';
import {MaterialModule} from '@app/shared/module/material.module';
import {CotylePadComponent} from './cotyle-pad/cotyle-pad.component';


@NgModule({
  declarations: [CotylePlanificationScreenComponent, CotyleplanifView1Component, CotyleplanifView2Component, CotylePadComponent, CotylePadComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: []
})
export class CotylePlanificationScreenModule {
}
