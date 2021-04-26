import {Injectable} from '@angular/core';
import {Observable, zip} from 'rxjs';
import {FemurBottomService} from '@app/services/bone/femur-bottom.service';
import {AnkleService} from '@app/services/bone/ankle.service';
import {PointService} from '@app/services/bone/point.service';
import {TibiaService} from '@app/services/bone/tibia.service';
import {PelvisService} from '@app/services/bone/pelvis.service';
import {FemurLeftService} from '@app/services/bone/femur-left.service';
import {FemurRightService} from '@app/services/bone/femur-right.service';
import {FemurHeadService} from '@app/services/bone/femur-head.service';
import {Color} from 'three';
import {DiaphysealNeckAxisService} from '@app/services/element/diaphyseal-neck-axis.service';
import {FemoralNeckAxisService} from '@app/services/element/femoral-neck-axis.service';
import {ObjectService} from '@app/services/bone/object.service';
import {DataSymfonyService} from "@app/api/data-symfony.service";

@Injectable({
  providedIn: 'root'
})
export class DisplayscreenView2LoaderService {


  constructor(
    private femurLeftService: FemurLeftService, private femurRightService: FemurRightService,
    private pelvisService: PelvisService,
    private femurBottomService: FemurBottomService, private ankleService: AnkleService,
    private diaphysealNeckAxisService: DiaphysealNeckAxisService, private femoralNeckAxisService: FemoralNeckAxisService,
    private femurHeadService: FemurHeadService, private objectService: ObjectService, private dataService: DataSymfonyService) {
  }


  getSource(): Observable<any> {
    return zip(
      this.objectService.load('pelvis', new Color(0xDCDCDC), true, false, false, false),
      this.objectService.load('coccyx', new Color(0xDCDCDC), true, false, false, false),
      this.objectService.load('femur-right', new Color(0xebe5b3), true, false, false, false),
      this.objectService.load('femur-left', new Color(0xebe5b3), true, false, false, false),
      this.objectService.load(`acetabular-center-${this.dataService.getSide()}`, new Color('grey'), false),
      this.objectService.load(`femur_head-center-${this.dataService.getSide()}`, new Color('yellow'), false),
      this.objectService.load(`acetabular_upper_edge-${this.dataService.getSide()}`, new Color('grey'), true),
      this.objectService.load(`acetabular_psoas-${this.dataService.getSide()}`, new Color('grey'), false),
      this.objectService.load(`greater_troch-${this.dataService.getSide()}`, new Color('yellow'), true), /*3*/
      this.objectService.load(`diaphyseal_neck_axis-${this.dataService.getSide()}`, new Color('yellow'), true),
      this.objectService.load(`femoral_neck_axis-${this.dataService.getSide()}`, new Color('yellow'), true),
    )
  }

  /**
   * @param object
   * @param scene
   */
  setScene(object, scene) {
    scene.add(...object);
  }
}
