import {Injectable} from '@angular/core';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import {ManagerService} from '../three/manager.service';
import {MaterialService} from '../three/material.service';
import {Implant} from '../class/implant';
import {BoneService} from '../bone/bone.service';
import {PsoasConflictService} from '../element/psoas-conflict.service';
import {AcetabularCenterService} from '../element/acetabular-center.service';
import {MathUtils, Mesh, MeshBasicMaterial, MeshPhongMaterial, RingGeometry, SphereBufferGeometry} from 'three';
import {DataDisplayScreenService} from "@app/ui/display-screen/data-display-screen.service";
import {Observable} from "rxjs";
import * as THREE from "three";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";

@Injectable({
  providedIn: 'root'
})
export class CupService extends Implant {
  public name = 'cup';
  public circle: Mesh;

  /**
   *
   * @param dataSymfonyService
   * @param manager
   * @param materialService
   * @param boneService
   * @param acetabularCenterService
   * @param psoasConflictService
   * @param dataDisplayScreenService
   */
  constructor(public dataSymfonyService: DataSymfonyService, public manager: ManagerService,
              private materialService: MaterialService, private boneService: BoneService,
              private acetabularCenterService: AcetabularCenterService, private psoasConflictService: PsoasConflictService,
              private dataDisplayScreenService: DataDisplayScreenService) {
    super(manager, dataSymfonyService);
    this.preplanification = this.dataSymfonyService.getCup('opened');
    this.planification = this.dataSymfonyService.getCup('closed');
    this.setParameters();
    this.path = `${location.origin}/assets/hip/${this.side}/${this.name}/${this.range.planification}/${this.size.planification}.obj`;
    this.material = this.materialService.createShaderContour();
    this.circle = new Mesh();
  }

  setGeometry(): Observable<THREE.Geometry | THREE.BufferGeometry> {
    return new Observable(observer => {
      const loader = new OBJLoader(this.manager.manager);
      loader
        .load(this.path, (object3d) => {
          // @ts-ignore
          this.geometry = object3d.children[0].geometry;
          this.geometry.computeBoundingSphere();
          // @ts-ignore
          const cupRadius = parseInt(object3d.children[0].geometry.boundingSphere.radius.toFixed(5));
          // @ts-ignore
          console.log("radius change", cupRadius, object3d.children[0].geometry.boundingSphere)
          this.circle.geometry = new RingGeometry(cupRadius, cupRadius + 5, cupRadius);
          observer.next(this.geometry);
        });
    });
  }

  setSize(size: string | number): void | Observable<any> {
    if (size >= 44 && size <= 68) {
      super.setSize(size);
    }
  }

  setRange(range: string): void {
    super.setRange(range);
  }

  setRotation() {
    this.mesh.rotation.set(0, this.getAnteversion() / 2, -Math.PI / 4);
  }

  getAcetabularCenterService() {
    return this.acetabularCenterService;
  }

  getAnteversion() {
    return this.psoasConflictService.getGlobalPosition()
      .sub(this.acetabularCenterService.getGlobalPosition())
      .angleTo(this.acetabularCenterService.getGlobalPosition());
  }
  createCenterHead(){
    const sphere = new Mesh(new SphereBufferGeometry(1, 50), new MeshPhongMaterial({
      color: 0x00ffd5,
      depthTest: false,
      transparent: true
    }));
    sphere.name = 'cup-center';
    sphere.renderOrder = 1;
    this.mesh.add(sphere);
  }
  /**
   *  @Z inclinaison
   *  @Y anteversion calcul de l'angle entre Psoas et le centre acétabulaire
   */

  snap() {
    this.createCenterHead();
    this.mesh.position.copy(this.acetabularCenterService.getGlobalPosition());
    this.mesh.rotation.set(0, MathUtils.degToRad(this.dataDisplayScreenService.data.cotyleInclinaison), -MathUtils.degToRad(this.dataDisplayScreenService.data.cotyleAnteversion));
    console.log('this.acetabularCenterService.getGlobalPosition()', this.acetabularCenterService.getGlobalPosition(), this.mesh)
  }

  drag() {
    this.mesh.position.copy(this.acetabularCenterService.getGlobalPosition());
  }

  setRing() {
    const cupRadius = parseInt(this.mesh.geometry.boundingSphere.radius.toFixed(5));
    this.circle.geometry = new RingGeometry(cupRadius, cupRadius + 5, cupRadius);
    const material = new MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});
    this.circle = new Mesh(this.circle.geometry, material);
    this.circle.name = 'circle';
    this.circle.rotation.set(0, -Math.PI / 2, 0);
  /*  this.mesh.add(this.circle);*/
  }
  setMaterial() {
    super.setMaterial(this.materialService.createCupMaterial());
  }
}
