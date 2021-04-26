import {
  Mesh,
  Vector3,
} from 'three';
import * as THREE from 'three';
import {PositionUtil} from 'threejs-position-util';

export class Meshoo extends Mesh {
  setPosition0(): void {
    this.position.copy(new Vector3());
  }
  getGlobalPosition(): THREE.Vector3 {

    return PositionUtil.getGeometryCenterInWorld(this);
  }
}
