import {Injectable} from '@angular/core';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import {ManagerService} from '../three/manager.service';
import {MaterialService} from '../three/material.service';
import {Elements} from '../class/elements';
import {LabelService} from '@app/services/three/label.service';
import {Color, Vector3} from 'three';

@Injectable({
  providedIn: 'root'
})
export class SphereDownService extends Elements {
  public name = `diaphyseal_bottom_point-${this.side}`;
  color = new Color('green');
  dragPosition = new Vector3();

  constructor(public dataSymfonyService: DataSymfonyService, public manager: ManagerService,
              private materialService: MaterialService, public labelService?: LabelService) {
    super(manager, dataSymfonyService);
    this.path = `${location.origin}/${this.dir}/${this.name}${this.addSimplifiee}.obj`;
    // Green
    this.material = this.materialService.setMeshLineMaterialSphere(this.color);
  }
}
