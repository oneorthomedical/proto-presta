import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {StateService} from "@app/shared/services/state.service";
import * as STATE from "@app/shared/constant/state.constant";

@Injectable({
  providedIn: 'root'
})
export class IsPlanificationAuthGuard implements CanActivate {
  constructor(private stateService: StateService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.stateService.state === STATE.DISPLAY_SCREEN;
  }

}
