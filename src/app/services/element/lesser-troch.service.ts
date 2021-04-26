import {Injectable} from '@angular/core';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import {ManagerService} from '../three/manager.service';
import {MaterialService} from '../three/material.service';
import {Elements} from '../class/elements';
import {LabelService} from '@app/services/three/label.service';
import {Color} from 'three';

@Injectable({
  providedIn: 'root'
})
export class LesserTrochService extends Elements {
  public name = 'lesser-troch';
  color = new Color(0x8a2be2);

  constructor(public dataSymfonyService: DataSymfonyService, public manager: ManagerService,
              private materialService: MaterialService, public labelService?: LabelService) {
    super(manager, dataSymfonyService);
    this.path = `${location.origin}/${this.dir}/${this.name}${this.addSimplifiee}.obj`;
    // BlueViolet
    this.material = this.materialService.setMaterialColor(this.color);
  }
}
