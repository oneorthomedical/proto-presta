import { Injectable } from '@angular/core';
import {Bone} from '../class/bone';
import {OBJLoader2} from 'three/examples/jsm/loaders/OBJLoader2';
import {Observable} from 'rxjs';
import {ManagerService} from './manager.service';
import {MaterialService} from './material.service';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class SphereLoaderService extends Bone {
  /**
   * @param managerService
   * @param dataSymfonyService
   * @param materialService
   */
  constructor(
    public managerService: ManagerService, public dataSymfonyService: DataSymfonyService,
    private materialService: MaterialService
  ) {
    super(managerService, dataSymfonyService);
  }
  // @ts-ignore
  load(name: string): Observable<THREE.Mesh> {
    return new Observable(observer => {
      const loader = new OBJLoader2(this.manager.manager);
      const path = `${location.origin}/${this.dir}/${name}${this.addSimplifiee}.obj`;
      const material = this.materialService.createSphere();
      loader.load(path, (object3d) => {
        // @ts-ignore
        const geometry = object3d.children[0].geometry;
        geometry.computeBoundingSphere();
        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = name;
        mesh.matrixAutoUpdate = false;
        observer.next(mesh);
      });
    });
  }
}
