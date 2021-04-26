import {Injectable} from '@angular/core';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import {ManagerService} from '../three/manager.service';
import {MaterialService} from '../three/material.service';
import {Elements} from '../class/elements';
import {LabelService} from '@app/services/three/label.service';
import {Mesh} from 'three';
import {SphereUpService} from '@app/services/element/sphere-up.service';
import {SphereDownService} from '@app/services/element/sphere-down.service';
import {zip} from 'rxjs';
import {GeometryElements} from '@app/services/class/geometryElements';
import * as THREE from 'three';
import {PositionUtil} from "threejs-position-util";

@Injectable({
  providedIn: 'root'
})
export class DiaphysealNeckAxisService extends Elements {
  public name = `diaphyseal_neck_axis-${this.side}`;
  // todo
  public sphereUp: Mesh;
  public sphereDown: Mesh;
  public line: GeometryElements;

  constructor(public dataSymfonyService: DataSymfonyService, public manager: ManagerService,
              private materialService: MaterialService, public sphereUpService: SphereUpService,
              public sphereDownService: SphereDownService,
              public labelService?: LabelService) {
    super(manager, dataSymfonyService);
    this.path = `${location.origin}/${this.dir}/${this.name}${this.addSimplifiee}.obj`;
    this.material = this.materialService.setMeshNormalLineMaterial(0x000000);
    this.sphereUpService.load().subscribe(mesh => this.sphereUp = mesh);
    this.sphereDownService.load().subscribe(mesh => this.sphereDown = mesh);
    this.mesh.renderOrder = 0;
    this.line = new GeometryElements();
    zip(
      this.sphereUpService.load(),
      this.sphereDownService.load()
    ).subscribe({
      next: ([sphereUp, sphereDown]) => {
        this.sphereUp = sphereUp;
        this.sphereDown = sphereDown;
        this.sphereUp.renderOrder = 1;
        this.sphereDown.renderOrder = 1;
      }
    });
  }

  merge(vector: THREE.Vector3): void {
    this.line.mesh.position.copy(vector.clone().negate().add(this.line.dragPosition));
    this.sphereDownService.mesh.position.copy(vector.clone().negate().add(this.sphereDownService.dragPosition));
    this.sphereUpService.mesh.position.copy(vector.clone().negate().add(this.sphereUpService.dragPosition));
  }
}
