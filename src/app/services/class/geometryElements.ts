import * as THREE from 'three';
import {Color, Object3D, Vector3} from 'three';
import {PositionUtil} from 'threejs-position-util';

export class GeometryElements {
  /**
   * @param manager
   * @param dataSymfonyService
   * @param labelService
   */
  color = new Color(0xFFFFFF);
  mesh;
  dragPosition = new Vector3();

  constructor() {
    this.mesh = new Object3D();
  }

  getVectorSphere(): THREE.Vector3 {
    this.mesh.children[0].geometry.computeBoundingSphere();
    return this.mesh.children[0].geometry.boundingSphere.center;
  }

  getWorldPosition(): THREE.Vector3 {
    return this.mesh.getWorldPosition(new THREE.Vector3());
  }

  getGlobalPosition(): THREE.Vector3 {
    return PositionUtil.getGeometryCenterInWorld(this.mesh.children[0]);
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
    this.mesh.children[0].geometry.computeBoundingBox();
    return this.mesh.children[0].geometry.boundingBox.getSize(new THREE.Vector3());
  }

  // TODO Y ==> Z   & Z ==> Y
  getInclinaisonDiaphyseal(): number {
    const vec = this.getBoundingBoxSize();
    const angle = Math.atan(vec.x / vec.z);
    console.log('Stem : getInclinaisonAngle', this.mesh, vec);
    return vec.x > 0 ? angle : -angle;
  }

  getAnteversionDiaphyseal(): number {
    const vec = this.getBoundingBoxSize();
    return Math.atan(vec.z / vec.y);
  }

  // TODO Y ==> Z   & Z ==> Y
  getCurvatureDiaphyseal(): number {
    const vec = this.getBoundingBoxSize();
    console.log('Stem : getCurvatureAngle', Math.atan(vec.y / vec.z));
    return Math.abs(Math.atan(vec.y / vec.z));
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
}
