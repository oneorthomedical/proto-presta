import { Injectable } from '@angular/core';
import {Bone} from '@app/services/class/bone';
import {ManagerService} from '@app/services/three/manager.service';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import {MaterialService} from '@app/services/three/material.service';
import {Mesh} from 'three';

@Injectable({
  providedIn: 'root'
})
export class FemurCutService extends Bone {
  public name = 'femur_cut';
  /**
   *
   * @param manager
   * @param dataSymfonyService
   * @param materialService
   */
  constructor(public manager: ManagerService, public dataSymfonyService: DataSymfonyService, private materialService: MaterialService) {
    super(manager, dataSymfonyService);
    this.mesh = new Mesh();
  }
}
