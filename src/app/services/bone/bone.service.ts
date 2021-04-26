import {Injectable} from '@angular/core';
import * as THREE from 'three';
import {ParentObject} from '../class/parentObject';
import {ManagerService} from '../three/manager.service';

@Injectable({
  providedIn: 'root'
})
export class BoneService extends ParentObject {
  constructor(public manager: ManagerService) {
    super(manager);
  }
  resetPosRot(mesh: THREE.Mesh): void {
  }
  reset() {
  }
}
