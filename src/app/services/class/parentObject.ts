import * as THREE from 'three';
import {ManagerService} from '../three/manager.service';
import {Observable} from 'rxjs';
import {TitleCasePipe} from '@angular/common';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {Mesh} from "three";


export class ParentObject {
  path: string;
  geometry: THREE.Geometry | THREE.BufferGeometry;
  name: string;
  mesh: THREE.Mesh;
  material: any;
  titlecasePipe: TitleCasePipe;

  /**
   *
   * @param manager
   */
  constructor(public manager: ManagerService) {
  }

  /**
   * Clone is boolean to add backObject the aim is clipping render  with red color
   * @param clone
   * clone = true object will have his own child
   */
  load(clone: boolean = false): Observable<Mesh> {
    return new Observable(observer => {
      const loader = new OBJLoader(this.manager.manager);
      loader.load(this.path, (object3d) => {
        // @ts-ignore
        this.geometry = this.assignUVs(new THREE.Geometry().fromBufferGeometry(object3d.children[0].geometry));
        this.geometry.computeBoundingSphere();
        this.geometry.computeBoundingBox();
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.titlecasePipe = new TitleCasePipe();
        this.mesh.name = this.name;
        this.material.name = this.name;
        if (clone) {
          const meshClone = this.mesh.clone();
          meshClone.name = `${this.mesh.name}_clone`;
          // @ts-ignore
          meshClone.material = new THREE.MeshBasicMaterial({
            color: 0xffa200,
            transparent : true,
            side: THREE.BackSide,
          });
          this.mesh.add(meshClone);
          meshClone.renderOrder = 6;
        }
        observer.next(this.mesh);
      });
    });
  }

  assignUVs(geometry) {
    geometry.computeFaceNormals();
    geometry.mergeVertices();
    geometry.faceVertexUvs[0] = [];
    geometry.faces.forEach((face) => {
      // @ts-ignore
      const components = ['x', 'y', 'z'].sort((a, b) => {
        return Math.abs(face.normal[a]) > Math.abs(face.normal[b]);
      });
      const v1 = geometry.vertices[face.a];
      const v2 = geometry.vertices[face.b];
      const v3 = geometry.vertices[face.c];
      geometry.faceVertexUvs[0].push([
        new THREE.Vector2(v1[components[0]], v1[components[1]]),
        new THREE.Vector2(v2[components[0]], v2[components[1]]),
        new THREE.Vector2(v3[components[0]], v3[components[1]])
      ]);
    });
    geometry.uvsNeedUpdate = true;
    return geometry;
  }

  /**
   * @param mesh
   * @param point
   * @param axis
   * @param angle
   */
  rotateAroundWorldAxis(mesh, point, axis, angle) {
    const q = new THREE.Quaternion();
    q.setFromAxisAngle(axis, angle);
    mesh.applyQuaternion(q);
    mesh.position.sub(point);
    mesh.position.applyQuaternion(q);
    mesh.position.add(point);
    return mesh;
  }

  rotateGeometryAroundWorldAxis(point, axis, angle) {
    const q = new THREE.Quaternion();
    q.setFromAxisAngle(axis, angle);
    const p = point.clone();
    p.applyQuaternion(q);
    return p;
  }

  getRotateAroundWorldAxis(vectorMesh, p, axis, angle) {
    const q = new THREE.Quaternion();
    q.setFromAxisAngle(axis, angle);
    const vec = vectorMesh.clone();
    const point = p.clone();
    vec.sub(point);
    vec.applyQuaternion(q);
    vec.add(point);
    return vec;
  }
}
