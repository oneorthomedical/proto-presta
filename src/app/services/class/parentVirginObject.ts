import {ManagerService} from "@app/services/three/manager.service";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {Observable} from "rxjs";
import {BufferGeometry, Geometry, Material, Mesh} from "three";
import * as THREE from "three";


export class ParentVirginObject {
  path: string;
  geometry: Geometry | BufferGeometry;
  name: string;
  mesh: Mesh;
  material: any;
  materialClone : any;

  /**
   *
   * @param manager
   */
  constructor(public manager: ManagerService) {
  }

  load(path: string, name: string, material: Material , clone = false , materialClone?): Observable<Mesh> {
    return new Observable(observer => {
      const loader = new OBJLoader(this.manager.manager);
      loader.load(path, (object3d) => {
        // @ts-ignore
        this.geometry = new Geometry().fromBufferGeometry(object3d.children[0].geometry);
        this.geometry.computeBoundingSphere();
        this.geometry.computeBoundingBox();
        this.mesh = new Mesh(this.geometry, material);
        this.mesh.name = name;
        if (clone) {
          const meshClone = this.mesh.clone();
          meshClone.name = `${this.mesh.name}_clone`;
          // @ts-ignore
          meshClone.material = materialClone;
          this.mesh.add(meshClone);
          meshClone.renderOrder = 6;
        }
        observer.next(this.mesh);
      });
    });
  }

  setGeometry(path: string): Observable<Geometry | BufferGeometry> {
    return new Observable(observer => {
      const loader = new OBJLoader(this.manager.manager);
      loader
        .load(path, (object3d) => {
          // @ts-ignore
          this.geometry = object3d.children[0].geometry;
          observer.next(this.geometry);
        });
    });
  }
}
