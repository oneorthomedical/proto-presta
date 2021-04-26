import {Injectable} from '@angular/core';
import {DataSymfonyService} from '@app/api/data-symfony.service';

@Injectable({
  providedIn: 'root'
})
export class DataDisplayScreenService {


  data = {
    femurHead: 0,
    acetabulum: 0,
    boneCCD: 0,
    femurOffset: 0,
    cotyleInclinaison: 0,
    cotyleAnteversion: 0,
    boneAnteversion: 0,
    planHelper: null,
    greaterTrochToStemHeaDistance: 0,
    cutNeckDistance: 0,
    revetementLength: 0,
    cutBSPTLength: 0,
    stemAnteversion: 0
  }

  constructor(private dataService: DataSymfonyService) {
    this.data.femurHead = this.dataService.data.preplanning.femur.headRadius;
    this.data.acetabulum = this.dataService.data.preplanning.acetabulum.headRadius;
  }
}
