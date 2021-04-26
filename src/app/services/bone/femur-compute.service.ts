import {Injectable} from '@angular/core';
import {Mesh} from 'three';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import {FemurCutService} from '@app/services/bone/femur-cut.service';

@Injectable({
  providedIn: 'root'
})
export class FemurComputeService {
  private femurCut: Mesh;
  private femurHead: Mesh;

  constructor(private dataSymfonyService: DataSymfonyService, private femurCutService: FemurCutService) {
  }

  compute(femurRight, femurLeft, femurHead, stem): Array<Mesh> {
    this.femurHead = femurHead.clone();
    this.cloneMaterial(this.femurHead, femurHead);
    if (this.dataSymfonyService.getSide() === 'right') {
      this.femurCut = femurRight.clone();
      this.cloneMaterial(this.femurCut, femurRight);
      this.femurCut.name = 'Femur_cut';
      this.femurHead.name = 'femur_head_right';
      this.femurCut.add(stem);
      femurRight.add(this.femurHead);
    } else {
      this.femurCut = femurLeft.clone();
      this.cloneMaterial(this.femurCut, femurLeft);
      this.femurCut.name = 'Femur_cut';
      this.femurHead.name = 'femur_head_left';
      this.femurCut.add(stem);
      femurLeft.add(this.femurHead);
    }
    return [femurRight, femurLeft, femurHead, this.femurCut]
  }

  setService() {
    this.femurCutService.mesh = this.femurCut;
    return this.femurCutService;
  }

  /**
   * For object with multiple children
   */
  cloneMaterial(objectToClone, object) {
    objectToClone.material = object.material.clone();
    // @ts-ignore
    objectToClone.children[0].material = object.children[0].material.clone();
  }
}
