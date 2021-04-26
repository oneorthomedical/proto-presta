import {Injectable} from '@angular/core';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import {ManagerService} from '@app/services/three/manager.service';
import {MaterialService} from '@app/services/three/material.service';
import {Elements} from '@app/services/class/elements';
import {Color, Euler, Vector3} from 'three';
import {LabelService} from '@app/services/three/label.service';


@Injectable({
  providedIn: 'root'
})
export class HeadCenterService extends Elements {
  public name = `femur_head-center-${this.side}`;
  color = new Color('Black');
  headCenterPosition: Vector3;

  constructor(public dataSymfonyService: DataSymfonyService, public manager: ManagerService,
              private materialService: MaterialService, public labelService?: LabelService) {
    super(manager, dataSymfonyService);
    /**
     * Chargement de l'acetabular center pour initialiser
     */
    /* const switchName = 'acetabular-center';*/
    this.path = `${location.origin}/${this.dir}/${this.name}${this.addSimplifiee}.obj`;
    this.material = this.materialService.setMeshLineMaterialSphere(this.color);
  }

  /**
   * @param size centre distance
   * @param rotation
   */
  computeSize(size: number, rotation: Euler): Vector3 {
    const x = -Math.cos(Math.abs(rotation.z)) * size;
    const y = -Math.sin(Math.abs(rotation.z)) * size;
    return new Vector3(x, y, 0);
  }
}
