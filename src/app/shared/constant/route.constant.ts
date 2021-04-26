import {DisplayScreenComponent} from '@app/ui/display-screen/display-screen.component';
import {CotylePlanificationScreenComponent} from '@app/ui/cotyle-planification-screen/cotyle-planification-screen.component';
import {FemurPlanificationScreenComponent} from '@app/ui/femur-planification-screen/femur-planification-screen.component';

export const PRODUCTION_ROUTES = [
  {path: ':lang/planning/modelisation/:id', redirectTo: ':lang/planning/modelisation/:id/display', pathMatch: 'full'},
  {path: ':lang/planning/modelisation/:id/display', component: DisplayScreenComponent},
  {path: ':lang/planning/modelisation/:id/cotyle', component: CotylePlanificationScreenComponent},
  {path: ':lang/planning/modelisation/:id/femur', component: FemurPlanificationScreenComponent},
];
export const DEV_ROUTES = [
  {path: '', redirectTo: '/display', pathMatch: 'full'},
  {path: 'display', component: DisplayScreenComponent},
  {path: 'cotyle', component: CotylePlanificationScreenComponent},
  {path: 'femur', component: FemurPlanificationScreenComponent},
];
