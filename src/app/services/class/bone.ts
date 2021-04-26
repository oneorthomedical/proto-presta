import {ManagerService} from '../three/manager.service';
import {ParentObject} from './parentObject';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import * as THREE from 'three';
export class Bone extends ParentObject {

  dir: string;
  state: string;
  addSimplifiee: string;
  side :string

  /**
   * @param manager
   * @param dataSymfonyService
   */
  constructor(public manager: ManagerService, public dataSymfonyService: DataSymfonyService,) {
    super(manager);
    this.state = this.dataSymfonyService.getIntervetion().state;
    this.dir = this.dataSymfonyService.getDirectory();
    this.addSimplifiee = this.dataSymfonyService.addSimplifiee();
    this.side = this.dataSymfonyService.getSide();
  }

  /**
   * Déplacement du fémur à un @offset @hauteur 0
   * @param vector
   */
  merge(vector: THREE.Vector3): void {
    this.mesh.position.copy(vector.clone().negate());
  }

  setPosition0() {
    this.mesh.position.copy(new THREE.Vector3(0, 0, 0));
    this.mesh.updateMatrixWorld(true);
  }
}
