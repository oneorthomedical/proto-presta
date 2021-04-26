import {Injectable} from '@angular/core';
import {Observable, zip} from "rxjs";
import {FemurBottomService} from "@app/services/bone/femur-bottom.service";
import {AnkleService} from "@app/services/bone/ankle.service";
import {PointService} from "@app/services/bone/point.service";
import {TibiaService} from "@app/services/bone/tibia.service";
import {PelvisService} from "@app/services/bone/pelvis.service";
import {FemurLeftService} from "@app/services/bone/femur-left.service";
import {FemurRightService} from "@app/services/bone/femur-right.service";
import {FemurHeadService} from "@app/services/bone/femur-head.service";
import {Color} from "three";
import {ObjectService} from "@app/services/bone/object.service";

@Injectable({
  providedIn: 'root'
})
export class DisplayscreenView1LoaderService {


  constructor(
    private femurLeftService: FemurLeftService, private femurRightService: FemurRightService,
    private pelvisService: PelvisService,
    private femurBottomService: FemurBottomService, private ankleService: AnkleService,
    private femurHeadService: FemurHeadService,
    private pointService: PointService, private tibiaService: TibiaService,
    private objectService: ObjectService) {
  }


  getSource(): Observable<any> {
    return zip(
      /*
       * Mesh
       */
      this.objectService.load('femur-left', new Color(0xebe5b3)),
      this.objectService.load('femur-right', new Color(0xebe5b3)),
      this.objectService.load('pelvis', new Color(0xebe5b3)),
      this.objectService.load('ankle-left', new Color(0xebe5b3)),
      this.objectService.load('ankle-right', new Color(0xebe5b3)),
      this.objectService.load('tibia-right', new Color(0xebe5b3)),
      this.objectService.load('tibia-left', new Color(0xebe5b3)),
      this.objectService.load('femur_bottom-right', new Color(0xebe5b3)),
      this.objectService.load('femur_bottom-left', new Color(0xebe5b3)),
      this.pointService.load('sacro_illiac-left', new Color(0Xff0000)), /*3*/
      this.pointService.load('sacro_illiac-right', new Color(0Xff0000)), /*3*/
      this.pointService.load('greater_troch-right', new Color(0Xff0000)), /*3*/
      this.pointService.load('greater_troch-left', new Color(0Xff0000)), /*3*/
      this.pointService.load('tibial_epine-left', new Color(0Xff0000)), /*3*/
      this.pointService.load('tibial_epine-right', new Color(0Xff0000)), /*3*/
      this.pointService.load('malleolus_center-left', new Color(0Xff0000)), /*3*/
      this.pointService.load('malleolus_center-right', new Color(0Xff0000)), /*3*/
    );
  }

  /**
   * @param object
   * @param scene
   */
  setScene(object, scene) {
    scene.add(...object);
  }
}
