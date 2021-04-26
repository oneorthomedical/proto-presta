import {AlwaysDepth, LessEqualDepth, MathUtils, Mesh, NeverDepth, Quaternion, Scene, Vector3} from 'three';
import {PositionUtil} from 'threejs-position-util';
import * as THREE from "three";

export class Utils {

  static getPositionByObjectName(scene: Scene, name: string): Vector3 {
    return PositionUtil.getGeometryCenterInWorld(scene.getObjectByName(name) as Mesh)
  }

  static getDistanceByObjectName(a: string, b: string, scene: Scene): number {
    return Utils.getPositionByObjectName(scene, a).distanceTo(Utils.getPositionByObjectName(scene, b));
  }

  static getMeshByName(scene: Scene, name: string): Mesh {
    return scene.getObjectByName(name) as Mesh;
  }

  /**
   *  alpha = atan a / b
   */
  static getAtan(a: number, b: number): number {
    return MathUtils.radToDeg(Math.atan(a / b));
  }

  static setAxisFromAngleAndCoplanarPoint(angle: number, point: Vector3, material) {
    const geometry = new THREE.CylinderBufferGeometry(0.2, 0.2, 600);
    const plane = new THREE.Mesh(geometry, material);
    plane.position.copy(point);
    plane.rotation.set(0, -angle, Math.PI / 2);
    plane.name = 'parralel';
    return plane;
  }

  /**
   *
   * @param mesh
   * @param point
   * @param axis
   * @param angle
   */
  static rotateAroundWorldAxis(mesh, point, axis, angle) {
    const q = new Quaternion();
    q.setFromAxisAngle(axis, angle);
    mesh.applyQuaternion(q);
    mesh.position.sub(point);
    mesh.position.applyQuaternion(q);
    mesh.position.add(point);
    return mesh;
  }

  static display(count, toClass, name, scene) {
    switch (count) {
      case 1 :
        toClass = 'transparency';
        // @ts-ignore
        Utils.getMeshByName(scene, name).material.transparent = true;
        // @ts-ignore
        Utils.getMeshByName(scene, name).material.opacity = 0.5;

        if (name === 'plan') {
          // @ts-ignore
          Utils.getMeshByName(scene, name).material.depthFunc = LessEqualDepth;
        } else {
          // @ts-ignore
          Utils.getMeshByName(scene, name).material.depthFunc = AlwaysDepth;
        }
        break;
      case 2:
        toClass = 'noVisible';
        // @ts-ignore
        Utils.getMeshByName(scene, name).material.transparent = false;
        // @ts-ignore
        Utils.getMeshByName(scene, name).material.opacity = 0;
        // @ts-ignore
        Utils.getMeshByName(scene, name).material.visible = false;
        break;
      case 3:
        toClass = 'visible';
        // @ts-ignore
        Utils.getMeshByName(scene, name).material.transparent = false;
        // @ts-ignore
        Utils.getMeshByName(scene, name).material.visible = true;
        // @ts-ignore
        Utils.getMeshByName(scene, name).material.opacity = 1;
        // @ts-ignore
        Utils.getMeshByName(scene, name).material.depthFunc = LessEqualDepth;
        break;
    }
    return toClass;
  }
  static displayShader(count, toClass, name, scene) {
    switch (count) {
      case 1 :
        toClass = 'transparency';
        // @ts-ignore
        Utils.getMeshByName(scene, name).material.transparent = true;
        // @ts-ignore
        Utils.getMeshByName(scene, name).material.opacity = 0.6;
        // @ts-ignore
        Utils.getMeshByName(scene, name).material.depthWrite = false;
        break;
      case 2:
        toClass = 'noVisible';
        // @ts-ignore
        Utils.getMeshByName(scene, `${name}_clone`).visible = false;
        // @ts-ignore
        Utils.getMeshByName(scene, name).visible = false;
        break;
      case 3:
        toClass = 'visible';
        // @ts-ignore
        Utils.getMeshByName(scene, `${name}_clone`).visible = true;
        // @ts-ignore
        Utils.getMeshByName(scene, name).visible = true;
        // @ts-ignore
        Utils.getMeshByName(scene, name).material.opacity = 1;
        // @ts-ignore
        Utils.getMeshByName(scene, name).material.depthWrite = true;
        break;
    }
    return toClass;
  }
  static cloneOriginalCup(scene: Scene, isMaterial: boolean , geometry): Mesh {
    const cupOriginal = this.getMeshByName(scene, 'Cup');
    let material;
    if (isMaterial) {
      material = new THREE.MeshStandardMaterial({
        color: 0x048b9a,
        clipIntersection: true,
        transparent: false,
        clippingPlanes: [],
      })
    } else {
      // @ts-ignore
      material = cupOriginal.material.clone();
    }
    const cup = new Mesh(geometry, material);
    cup.name = 'Cup'
    cup.position.copy(cupOriginal.position);
    cup.rotation.copy(cupOriginal.rotation);
    return cup;
  }

  static cloneOriginalStem(scene: Scene, isMaterial: boolean , geometry): Mesh {
    const stemOriginal = this.getMeshByName(scene, 'Stem');
    let material;
    if (isMaterial) {
      material = new THREE.MeshStandardMaterial({
        color: 0x048b9a,
        clipIntersection: true,
        transparent: true,
        clippingPlanes: [],
      });
      material.name = 'Stem';
    } else {
      // @ts-ignore
      material = stemOriginal.material.clone();
    }
    const stem = new Mesh(geometry, material);
    stem.name = 'Stem'
    stem.position.copy(stemOriginal.position);
    stem.rotation.copy(stemOriginal.rotation);
    stem.renderOrder = 1;
    return stem;
  }

  static getDistance(vecteurA, vecteurB, angle) {
    const m = Math.tan(angle)
    let p1 = vecteurA.z - m * vecteurA.x;
    let p2 = vecteurB.z - m * vecteurB.x;
    const distance = Math.abs(p1 - p2) / Math.sqrt(1 + Math.pow(m, 2));
    return distance;
  }
}
