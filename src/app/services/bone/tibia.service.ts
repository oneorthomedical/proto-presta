import {Injectable} from '@angular/core';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import {ManagerService} from '../three/manager.service';
import {MaterialService} from '../three/material.service';
import {Color, Mesh} from "three";
import {Observable} from "rxjs";
import {VirginBone} from "@app/services/class/virginBone";

@Injectable({
  providedIn: 'root'
})
export class TibiaService extends VirginBone {
  public name = 'tibia';

  /**
   *
   * @param manager
   * @param dataSymfonyService
   * @param materialService
   */
  constructor(public manager: ManagerService, public dataSymfonyService: DataSymfonyService, private materialService: MaterialService) {
    super(manager, dataSymfonyService);
    this.path = `${location.origin}/${this.dir}/${this.name}${this.addSimplifiee}.obj`;
  }

  // @ts-ignore
  load(name: string, color: Color): Observable<Mesh> {
    this.material = this.materialService.createBoneMaterial();
    const path = `${location.origin}/${this.dir}/${name}${this.addSimplifiee}.obj`;
    return super.load(path, name, this.material);
  }
}

