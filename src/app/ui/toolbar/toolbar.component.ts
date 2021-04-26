import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StateService} from '@app/shared/services/state.service';
import * as STATE from '@app/shared/constant/state.constant'
import {DataSymfonyService} from '@app/api/data-symfony.service';

const ON_MODIFIED = 'onModified'
const TO_MODIFIED = 'toModified'
const DONE = 'done'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})


export class ToolbarComponent implements OnInit {
  displayClass: any;
  cotyleClass: any;
  femurClass: any;
  planificationClass: any;
  isCotyleDisabled: any;
  isFemurDisabled: any;
  isPlanificationDisabled: any;
  lang: string;
  workflowId: number;

  constructor(public  router: Router, public stateService: StateService, private dataSymfonyService: DataSymfonyService) {
  }

  ngOnInit(): void {
    this.displayClass = ON_MODIFIED;
    this.cotyleClass = TO_MODIFIED;
    this.femurClass = TO_MODIFIED;
    this.planificationClass = TO_MODIFIED;
    this.isCotyleDisabled = true;
    this.isFemurDisabled = true;
    this.isPlanificationDisabled = true;
    this.lang = this.dataSymfonyService.dataUser.user.lang;
    this.workflowId = +this.dataSymfonyService.getDS()
  }

  next() {
    const url = this.generateUrl();
    if (this.stateService.state === STATE.DISPLAY_SCREEN) {
      this.displayClass = DONE;
      this.cotyleClass = ON_MODIFIED
      this.router.navigateByUrl(url + '/cotyle').then(r => {
        this.isCotyleDisabled = false;
        this.stateService.state = STATE.COTYLE_PLANIFICATION;
      });

    } else if (this.stateService.state === STATE.COTYLE_PLANIFICATION) {
      this.cotyleClass = DONE;
      this.femurClass = ON_MODIFIED
      this.router.navigateByUrl(url + '/femur').then(r => {
        this.isFemurDisabled = false;
        this.stateService.state = STATE.FEMUR_PLANIFICATION;
      });
    } else if (this.stateService.state === STATE.FEMUR_PLANIFICATION) {
      this.femurClass = DONE;
      this.planificationClass = ON_MODIFIED
      this.router.navigateByUrl(url + '/planification').then(r => {
        this.isPlanificationDisabled = false;
        this.stateService.state = STATE.PLANIFICATION;
      });
    }
  }

  generateUrl() {
    return this.dataSymfonyService.getEnvironment() ? this.lang + '/planning/modelisation/' + this.workflowId : '';
  }
}
