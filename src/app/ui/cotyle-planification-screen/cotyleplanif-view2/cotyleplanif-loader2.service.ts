import {Injectable} from '@angular/core';
import {Observable, zip} from 'rxjs';
import {Color} from 'three';
import {CupService} from '@app/services/implant/cup.service';
import {ObjectService} from '@app/services/bone/object.service';

@Injectable({
  providedIn: 'root'
})
export class CotyleplanifLoader2Service {

  constructor(private cupService: CupService, private objectService: ObjectService) {
  }

  getSource(): Observable<any> {
    return zip(
      this.objectService.load('pelvis', new Color(0xDCDCDC), true,
        true , true , false , true),
    );
  }
}
