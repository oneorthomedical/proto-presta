import {Injectable} from '@angular/core';
import {Color, Mesh} from "three";
import {DataSymfonyService} from "@app/api/data-symfony.service";
import {ManagerService} from "@app/services/three/manager.service";
import {Observable} from "rxjs";
import {MaterialService} from "@app/services/three/material.service";
import {VirginBone} from "@app/services/class/virginBone";

@Injectable({
  providedIn: 'root'
})
export class PointService extends VirginBone {

  constructor(public dataSymfonyService: DataSymfonyService, public manager: ManagerService, private materialService: MaterialService) {
    super(manager, dataSymfonyService);
  }

  // @ts-ignore
  load(name: string, color: Color): Observable<Mesh> {
    this.material = this.materialService.generateBasicMaterial(color);
    const path = `${location.origin}/${this.dir}/${name}${this.addSimplifiee}.obj`;
    return super.load(path, name, this.material);
  }
}
