import {Injectable} from '@angular/core';
import {Observable, zip} from 'rxjs';
import {CupService} from '@app/services/implant/cup.service';
import {Color} from 'three';
import {ObjectService} from '@app/services/bone/object.service';
import {AcetabularCenterService} from '@app/services/element/acetabular-center.service';
import {DataSymfonyService} from "@app/api/data-symfony.service";

@Injectable({
  providedIn: 'root'
})
export class CotyleplanifLoader1Service {

  constructor(private cupService: CupService, private objectService: ObjectService,
              private acetabularCenterService: AcetabularCenterService, private dataService: DataSymfonyService) {
  }

  getSource(): Observable<any> {
    return zip(
      this.objectService.load('pelvis', new Color(0xDCDCDC), true, false, true),
      this.acetabularCenterService.load(), /*4*/
      this.cupService.load(), /*9*/
    );
  }

  compute() {
    this.cupService.snap();
    this.cupService.setRing();
    this.cupService.save();
  }
}
