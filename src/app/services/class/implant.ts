import * as THREE from 'three';
import {ManagerService} from '../three/manager.service';
import {Observable} from 'rxjs';
import {OBJLoader2} from 'three/examples/jsm/loaders/OBJLoader2';
import {ParentObject} from './parentObject';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import {Cut, ImplantParams} from '@app/shared/interface/Interface';
import {Euler, Mesh, Vector3} from 'three';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {TitleCasePipe} from '@angular/common';

export class Implant extends ParentObject {
  size: Cut;
  range: Cut;
  position: Cut;
  rotation: Cut;
  side: string;
  state: string;
  planification: ImplantParams;
  preplanification: ImplantParams;

  /**
   * @param manager
   * @param dataSymfonyService
   */
  constructor(public manager: ManagerService, public dataSymfonyService: DataSymfonyService) {
    super(manager);
    this.state = this.dataSymfonyService.getIntervetion().state;
    this.side = this.dataSymfonyService.getSide();
  }

  load(clone: boolean = false): Observable<Mesh> {
    return new Observable(observer => {
      const loader = new OBJLoader(this.manager.manager);
      loader.load(this.path, (object3d) => {
        // @ts-ignore
        this.geometry = new THREE.Geometry().fromBufferGeometry(object3d.children[0].geometry);
        this.geometry.computeBoundingSphere();
        this.geometry.computeBoundingBox();
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.titlecasePipe = new TitleCasePipe();
        this.mesh.name = this.titlecasePipe.transform(this.name);
        this.material.name = this.titlecasePipe.transform(this.name);
        if (clone) {
          const meshClone = this.mesh.clone();
          meshClone.name = `${this.mesh.name}_clone`;
          // @ts-ignore
          meshClone.material = new THREE.MeshBasicMaterial({
            color: 0xffa200,
            transparent: true,
            side: THREE.BackSide,
          });
          this.mesh.add(meshClone);
          meshClone.renderOrder = 6;
        }
        observer.next(this.mesh);
      });
    });
  }

  setGeometry(): Observable<THREE.Geometry | THREE.BufferGeometry> {
    return new Observable(observer => {
      const loader = new OBJLoader2(this.manager.manager);
      loader
        .load(this.path, (object3d) => {
          // @ts-ignore
          this.geometry = object3d.children[0].geometry;
          observer.next(this.geometry);
        });
    });
  }


  setSize(size: string | number): void {
    this.size.planification = size;
    this.path = `${location.origin}/assets/hip/${this.side}/${this.name}/${this.range.planification}/${this.size.planification}.obj`;
    this.setGeometry().subscribe(geometry => this.mesh.geometry = geometry);
  }

  setSizeChangeImplant(size: number): void {
    this.size.planification = size;
    this.path = `${location.origin}/assets/hip/${this.side}/${this.name}/${this.range.planification}/${this.size.planification}.obj`;
  }

  setRange(range: string): void {
    this.range.planification = range;
    this.path = `${location.origin}/assets/hip/${this.side}/${this.name}/${this.range.planification}/${this.size.planification}.obj`;
    this.setGeometry().subscribe(geometry => this.mesh.geometry = geometry);
  }

  setParameters() {
    this.size = {
      preplanification: this.preplanification.size,
      planification: this.planification.size
    };
    this.range = {
      preplanification: this.preplanification.range,
      planification: this.planification.range
    };
    this.position = {
      preplanification: this.preplanification.position,
      planification: this.planification.position,
    };
    this.rotation = {
      preplanification: this.preplanification.rotation,
      planification: this.planification.rotation
    };
  }

  setPosition() {

  }

  setRotation() {

  }

  setPosRot() {
    this.setPosition();
    this.setRotation();
  }

  setPlanificationPosition() {
    this.mesh.position.set(this.planification.position.x, this.planification.position.y, this.planification.position.z)
    this.mesh.rotation.set(this.planification.rotation.x, this.planification.rotation.y, this.planification.rotation.z)
  }

  reset() {
    this.planification = this.preplanification;
    this.setParameters();
    this.setSize(this.size.planification);
    this.setRange(this.range.planification);
    this.setPosRot();
  }

  catchPosition(position: Vector3) {
    this.position.planification = {
      x: position.x,
      y: position.y,
      z: position.z
    };
  }

  catchRotation(rotation: Euler) {
    this.rotation.planification = {
      x: rotation.x,
      y: rotation.y,
      z: rotation.z
    };
  }

  save() {
    this.planification = {
      size: this.size.planification,
      range: this.range.planification,
      position: {
        x: this.mesh.position.x,
        y: this.mesh.position.y,
        z: this.mesh.position.z
      },
      rotation: {
        x: this.mesh.rotation.x,
        y: this.mesh.rotation.y,
        z: this.mesh.rotation.z
      }
    };
    console.log('save', this.planification);
  }

  setMaterial(material) {
    this.mesh.material = material;
    this.material = material;
  }
}
