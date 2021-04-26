import {Injectable} from '@angular/core';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import {ManagerService} from '../three/manager.service';
import {MaterialService} from '../three/material.service';
import {Color, DoubleSide, Mesh, MeshPhongMaterial, MeshStandardMaterial, VertexColors} from "three";
import {Observable} from "rxjs";
import {VirginBone} from "@app/services/class/virginBone";

@Injectable({
  providedIn: 'root'
})
export class ObjectService extends VirginBone {
  public name = 'object';

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
  load(name: string, color: Color, depthTest = true, transparent = false, clone = false, shader = false, shaderClone = false): Observable<Mesh> {
    let material;
    let materialClone;
    if (shader) {
      material = this.materialService.createShader2();

    } else {
      material = new MeshPhongMaterial({
        color,
        depthTest,
        transparent,
        side: DoubleSide,
        clippingPlanes: [],
        colorWrite: true
      });
    }
    if (shaderClone) {
      materialClone = this.materialService.createShaderClone();
    } else {
      materialClone = this.materialService.createBasicMaterialClone();
    }
    const path = `${location.origin}/${this.dir}/${name}${this.addSimplifiee}.obj`;
    if(clone) {
      return super.load(path, name, material, clone , materialClone);
    }
    return super.load(path, name, material, clone);
  }
}
