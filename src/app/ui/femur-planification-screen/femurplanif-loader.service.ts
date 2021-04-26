import {Injectable} from '@angular/core';
import {Observable, zip} from 'rxjs';
import {Color} from 'three';
import {StemService} from '@app/services/implant/stem.service';
import {ObjectService} from '@app/services/bone/object.service';
import {DiaphysealNeckAxisService} from '@app/services/element/diaphyseal-neck-axis.service';
import {FemoralNeckAxisService} from '@app/services/element/femoral-neck-axis.service';
import {DigitalFossaService} from '@app/services/element/digital-fossa.service';
import {DragService} from '@app/services/three/drag.service';
import {AcetabularCenterService} from '@app/services/element/acetabular-center.service';
import {HeadCenterService} from '@app/services/element/head-center.service';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import {Utils} from "@app/services/class/Utils";

@Injectable({
  providedIn: 'root'
})
export class FemurplanifLoaderService {

  side: string;

  constructor(private stemService: StemService, private objectService: ObjectService,
              private diaphysealNeckAxisService: DiaphysealNeckAxisService, private femoralNeckAxisService: FemoralNeckAxisService,
              private digitalFossaService: DigitalFossaService, private dragService: DragService,
              private acetabularCenterService: AcetabularCenterService, private headCenterService: HeadCenterService,
              private dataService: DataSymfonyService) {
    this.side = this.dataService.getSide();
  }

  getSourceView1(): Observable<any> {
    return zip(
      this.objectService.load(`femur_cut-${this.side}`, new Color(0xDCDCDC),
        true, true, true),
      this.diaphysealNeckAxisService.load(),
      this.femoralNeckAxisService.load(),
      this.digitalFossaService.load(),
      this.acetabularCenterService.load(),
      this.headCenterService.load(),
      this.stemService.load(), /*9*/
      this.objectService.load(`greater_troch-${this.side}`, new Color(0xebe5b3), false, true), /*3*/
    );
  }

  getSourceView2(): Observable<any> {
    return zip(
      this.objectService.load(`femur_cut-${this.side}`, new Color(0xDCDCDC),
        true, true, true),
    );
  }

  getSourceView3(): Observable<any> {
    return zip(
      this.objectService.load(`femur_cut-${this.side}`, new Color(0xDCDCDC),
        true, true, true),
    );
  }

  compute(scene) {
    this.dragService.createAxisDraggableV2(scene, this.diaphysealNeckAxisService.sphereUp, this.diaphysealNeckAxisService.sphereDown);
    this.stemService.snapV2();
    this.stemService.save();
  }

  getSourceView4(): Observable<any> {
    return zip(
      this.objectService.load(`femur_cut-${this.side}`, new Color(0xDCDCDC), true,
        true, true, false , true),
    );
  }
}
