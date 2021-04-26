import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {environment} from '@environments/environment';
import {DEV_ROUTES, PRODUCTION_ROUTES} from '@app/shared/constant/route.constant';

const routes: Routes = environment.production ? PRODUCTION_ROUTES : DEV_ROUTES

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
