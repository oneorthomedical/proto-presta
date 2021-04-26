import {Injectable} from '@angular/core';
import {Bone} from '../class/bone';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import {ManagerService} from '../three/manager.service';
import {MaterialService} from '../three/material.service';

@Injectable({
  providedIn: 'root'
})
export class FemurRightService extends Bone {
  public name = 'femur_right';
  /**
   *
   * @param manager
   * @param dataSymfonyService
   * @param materialService
   */
  constructor(public manager: ManagerService, public dataSymfonyService: DataSymfonyService, private materialService: MaterialService) {
    super(manager, dataSymfonyService);
    this.path = `${location.origin}/${this.dir}/${this.name}${this.addSimplifiee}.obj`;
    this.material = this.materialService.createBoneMaterial();
  }
}
