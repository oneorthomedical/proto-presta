import {Injectable} from '@angular/core';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import {ManagerService} from '../three/manager.service';
import {MaterialService} from '../three/material.service';
import {Elements} from '../class/elements';
import {LabelService} from '@app/services/three/label.service';

@Injectable({
  providedIn: 'root'
})
export class FemoralNeckAxisService extends Elements {
  public name = `femoral_neck_axis-${this.side}`;

  constructor(public dataSymfonyService: DataSymfonyService, public manager: ManagerService,
              private materialService: MaterialService, public labelService?: LabelService) {
    super(manager, dataSymfonyService);
    this.path = `${location.origin}/${this.dir}/${this.name}${this.addSimplifiee}.obj`;
    this.material = this.materialService.setMaterialColor(0xFFC0CB);
  }
}
