import {ManagerService} from '../three/manager.service';
import * as THREE from 'three';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import {Bone} from './bone';
import {LabelService} from '@app/services/three/label.service';
import {Color} from 'three';
import {PositionUtil} from 'threejs-position-util';

export class Elements extends Bone {
  /**
   * @param manager
   * @param dataSymfonyService
   * @param labelService
   */
  color = new Color(0xFFFFFF);

  constructor(public manager: ManagerService, public dataSymfonyService: DataSymfonyService, public labelService?: LabelService) {
    super(manager, dataSymfonyService);
    this.mesh = new THREE.Mesh();
    this.mesh.renderOrder = 8;
  }

  getVectorSphere(): THREE.Vector3 {
    this.mesh.geometry.computeBoundingSphere();
    return this.mesh.geometry.boundingSphere.center;
  }

  getWorldPosition(): THREE.Vector3 {
    return this.mesh.getWorldPosition(new THREE.Vector3());
  }
  getGlobalPosition(): THREE.Vector3 {
    return PositionUtil.getGeometryCenterInWorld(this.mesh);
  }
  scale(s: number) {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(s),
      this.mesh.material
    );
    mesh.geometry.translate(
      this.getVectorSphere().x,
      this.getVectorSphere().y,
      this.getVectorSphere().z,
    );
    this.mesh.geometry = mesh.geometry;
  }

  getBoundingBoxSize(): THREE.Vector3 {
    this.mesh.geometry.computeBoundingBox();
    return this.mesh.geometry.boundingBox.getSize(new THREE.Vector3());
  }
  // TODO Y ==> Z   & Z ==> Y changed = ok
  getInclinaisonDiaphyseal(): number {
    const vec = this.getBoundingBoxSize();
    return Math.atan(vec.x / vec.z);
  }

  getAnteversionDiaphyseal(): number {
    const vec = this.getBoundingBoxSize();
    return Math.atan(vec.z / vec.y);
  }

  getCurvatureDiaphyseal(): number {
    const vec = this.getBoundingBoxSize();
    return Math.atan(vec.y / vec.z);
  }

  getAnteversionCol(): number {
    const vec = this.getBoundingBoxSize();
    return Math.atan(vec.z / vec.x);
  }

  getSlopeXY(): number {
    const vec = this.getBoundingBoxSize();
    return vec.y / vec.x;
  }

  /**
   * Y = aX + b
   */
  getFunctionXY(): any {
    const center = this.getVectorSphere();
    const m = this.getSlopeXY();
    const p = center.y - m * center.x;
    return {m, p};
  }

  getFunctionFromSlope(slope: number) {
    const center = this.getVectorSphere();
    const m = slope;
    const p = center.y - m * center.x;
    return {m, p};
  }

  getFunctionPerpendicular({x, y}) {
    const m = 1 / this.getSlopeXY();
    const p = y - m * x;
    return {m, p};
  }

  getFunctionParallel({x, y}) {
    const m = 1 / this.getSlopeXY();
    const p = y - m * x;
    return {m, p};
  }

  drawPerpendicular(vector) {
    const geometry = new THREE.BoxGeometry(150, 1, 0.5);
    const material = new THREE.MeshBasicMaterial({color: 0x0000ff});
    const line = new THREE.Mesh(geometry, material);
    line.position.copy(vector);
    line.rotateZ(Math.atan(1 / this.getSlopeXY()));
    return line;
  }

  updateMatrix() {
    // TODO update geometry position

  }

  createLabel() {
    const label = this.labelService.makeTextSprite(this.name, {
      fontsize: 25,
      backgroundColor:
        {
          r: this.color.convertLinearToSRGB().r * 255,
          g: this.color.convertLinearToSRGB().g * 255,
          b: this.color.convertLinearToSRGB().b * 255, a: 1.0
        }
    });
    label.name = `label_${this.name}`;
    label.position.copy(this.getVectorSphere());
    this.mesh.add(label);
    label.visible = false;
    this.mesh.visible = false;
  }
}
