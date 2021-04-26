import {Injectable} from '@angular/core';
import * as STATE from '@app/shared/constant/state.constant'

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public state = STATE.DISPLAY_SCREEN;
  constructor() {
  }
}
