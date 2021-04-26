import {Injectable} from '@angular/core';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import {ManagerService} from '../three/manager.service';
import {MaterialService} from '../three/material.service';
import {Implant} from '../class/implant';
import {BoneService} from '../bone/bone.service';
import {Coordinate} from '@app/shared/class/coordinate';
import * as THREE from 'three';
import {DataLocalService} from '@app/api/data-local.service';
import {FemurService} from '@app/shared/interface/Interface';
import {Meshoo} from '../class/meshoo';
import {DiaphysealNeckAxisService} from '@app/services/element/diaphyseal-neck-axis.service';
import {FemoralNeckAxisService} from '@app/services/element/femoral-neck-axis.service';
import {AcetabularCenterService} from '@app/services/element/acetabular-center.service';
import {DigitalFossaService} from '@app/services/element/digital-fossa.service';
import {HeadCenterService} from '@app/services/element/head-center.service';
import {LesserTrochService} from '@app/services/element/lesser-troch.service';
import {GreaterTrochService} from '@app/services/element/greater-troch.service';
import {PositionUtil} from 'threejs-position-util';
import {Euler, Vector3} from "three";
import {Utils} from "@app/services/class/Utils";


@Injectable({
  providedIn: 'root'
})
export class StemService extends Implant {
  public name = 'stem';
  public coordinates: Coordinate[];
  public coordinate: { x, y, z };
  public centerDiaphysealNeckAxis: THREE.Vector3;
  public diaphysealCurvature: number;
  public diaphysealInclinaison: number;
  public femoralAnteversion: number;
  public centerAcetabular: THREE.Vector3;
  private digitalFossa: THREE.Vector3;
  private stemHead: Meshoo;
  public meshCenterHead: Meshoo;
  public femurService: FemurService;
  public isAssembly = false;

  /**
   *
   * @param dataSymfonyService
   * @param manager
   * @param materialService
   * @param boneService
   * @param diaphysealNeckAxisService
   * @param femoralNeckAxisService
   * @param acetabularCenterService
   * @param digitalFossaService
   * @param headCenterService
   * @param lesserTrochService
   * @param greaterTrochService
   * @param dataLocalService
   */
  constructor(public dataSymfonyService: DataSymfonyService, public manager: ManagerService,
              public materialService: MaterialService, public boneService: BoneService,
              public diaphysealNeckAxisService: DiaphysealNeckAxisService, public femoralNeckAxisService: FemoralNeckAxisService,
              public acetabularCenterService: AcetabularCenterService, public digitalFossaService: DigitalFossaService,
              public headCenterService: HeadCenterService, public lesserTrochService: LesserTrochService,
              public greaterTrochService: GreaterTrochService,
              public dataLocalService: DataLocalService) {
    super(manager, dataSymfonyService);
    this.preplanification = this.dataSymfonyService.getStem('opened');
    this.planification = this.dataSymfonyService.getStem('closed');
    this.setParameters();
    this.path = `${location.origin}/assets/hip/${this.side}/${this.name}/${this.range.planification}/${this.size.planification}.obj`;
    console.log('path', this.path);
    this.material = this.materialService.createShaderContour();
    this.dataLocalService.getCoordinateData().subscribe(
      value => {
        this.coordinates = value;
      }
    );
  }

  setSize(size: string | number): void {
    if (size >= 1 && size <= 10) {
      super.setSize(size);
      this.updateStemHead();
      if (this.isAssembly) {
        this.assembly();
      }
    }
  }

  updateStemHead() {
    const positionHead = new THREE.Vector3(-this.getCoordinate().x, 0, this.getCoordinate().z);
    this.stemHead.position.copy(positionHead);
  }

  setRange(range: string): void {
    super.setRange(range);
    this.updateStemHead();
    if (this.isAssembly) {
      this.assembly();
    }
  }

  /**
   * Ramener l'offset et hauteur à zero en
   * calculant la difference entre centre
   * cotyle et centre tête tige
   */
  assemblyToOffsetAndHeight() {
    const vectorToCenter = this.distanceCenter();
    this.femoralNeckAxisService.merge(vectorToCenter);
    this.digitalFossaService.merge(vectorToCenter);
    this.femurService.head.merge(vectorToCenter);
    this.femurService.cut.merge(vectorToCenter);
    this.greaterTrochService.merge(vectorToCenter);
    this.lesserTrochService.merge(vectorToCenter);
    this.diaphysealNeckAxisService.merge(vectorToCenter);
  }

  assemblyToOffsetAndHeightV2(scene) {
    const vectorToCenter = this.distanceCenterV2(scene);
    const posFemurVector = Utils.getMeshByName(scene, `femur_cut-${this.dataSymfonyService.getSide()}`).position;
    Utils.getMeshByName(scene, `femur_cut-${this.dataSymfonyService.getSide()}`)
      .position.copy(posFemurVector.add(vectorToCenter.negate()));
    const posVector = new Vector3(this.planification.position.x, this.planification.position.y, this.planification.position.z);
    this.mesh.position.copy(posVector.add(vectorToCenter));
  }

  setRotation() {

  }

  /**
   * Stem.rotation(courbure,anteversion,inclinaison)
   * @param femurService
   * @param scene
   */
  snap(femurService: FemurService) {
    this.digitalFossa = this.digitalFossaService.getGlobalPosition();
    this.centerDiaphysealNeckAxis = this.diaphysealNeckAxisService.line.getGlobalPosition();
    this.diaphysealCurvature = this.diaphysealNeckAxisService.line.getCurvatureDiaphyseal();
    this.diaphysealInclinaison = this.diaphysealNeckAxisService.line.getInclinaisonDiaphyseal();
    this.centerAcetabular = this.acetabularCenterService.getGlobalPosition();
    // TODO to delete
    this.femoralAnteversion = this.femoralNeckAxisService.getAnteversionCol();
    this.femurService = femurService;
    this.setAxisPosition();
    this.lookAtToAcetabularCenter();
    this.headCenterService.headCenterPosition = this.meshCenterHead.position.clone();
  }

  /**
   * Stem.rotation(courbure,anteversion,inclinaison)
   * @param scene
   * @without femurService
   */
  snapV2() {
    this.digitalFossa = this.digitalFossaService.getGlobalPosition();
    this.centerDiaphysealNeckAxis = this.diaphysealNeckAxisService.line.getGlobalPosition();
    this.diaphysealCurvature = this.diaphysealNeckAxisService.line.getCurvatureDiaphyseal();
    this.diaphysealInclinaison = this.diaphysealNeckAxisService.line.getInclinaisonDiaphyseal();
    this.centerAcetabular = this.acetabularCenterService.getGlobalPosition();
    // TODO to delete
    this.femoralAnteversion = this.femoralNeckAxisService.getAnteversionCol();
    this.setAxisPosition();
    this.lookAtToAcetabularCenter();
    this.headCenterService.headCenterPosition = this.meshCenterHead.position.clone();
  }

  /**
   * Copy to centerDiaphyseal
   * calcul de la hauteur par rapport à la fossete digital
   */
  setAxisPosition() {
    /**
     * Itération1
     */
    this.mesh.position.copy(this.centerDiaphysealNeckAxis);
    this.mesh.rotation.set(this.diaphysealCurvature, this.diaphysealInclinaison, 0);
    /**
     * Itération 2
     */
    const deltaZ = Math.abs(this.digitalFossa.z - this.centerDiaphysealNeckAxis.z);
    const deltaX = Math.abs(Math.tan(this.diaphysealInclinaison) * deltaZ);
    const deltaY = Math.abs(Math.tan(this.diaphysealCurvature) * deltaZ);
    this.side === 'right' ? this.mesh.position.x += deltaX : this.mesh.position.x -= deltaX;
    this.mesh.position.z = this.digitalFossa.z;
    this.mesh.position.y -= deltaY;

  }

  /**
   * Angulation de l'axe
   */
  getCurvedAngle() {
    return 1 / Math.cos(this.diaphysealCurvature);
  }

  /**
   * Angle entre centre tête tige - centre tige (fosset) - centre head pour orienter la tige // anteversion
   */
  createStemHead() {
    this.stemHead = new Meshoo();
    const positionHead = new THREE.Vector3(-this.getCoordinate().x, 0, this.getCoordinate().z);
    this.stemHead.position.copy(positionHead);
    this.stemHead.geometry = new THREE.SphereBufferGeometry(3, 30);
    this.stemHead.material = new THREE.MeshNormalMaterial();
    this.stemHead.name = 'stem-center';
    this.mesh.add(this.stemHead);
    this.stemHead.visible = true;
    this.stemHead.material.depthTest = false;
  }

  createCenterHead() {
    this.meshCenterHead = new Meshoo();
    this.meshCenterHead.position.copy(this.headCenterService.getGlobalPosition());
  }

  getAngle() {
    this.mesh.updateMatrixWorld();
    this.createCenterHead();
    this.createStemHead();
    const headWorldPosition = PositionUtil.getGeometryCenterInWorld(this.stemHead);
    const vecA = headWorldPosition.clone().sub(this.mesh.position).normalize();
    const vecB = this.meshCenterHead.position.clone().sub(this.mesh.position).normalize();
    const dotProduct = Math.acos(vecA.dot(vecB));
    /* console.log('dotProduct', THREE.MathUtils.radToDeg(dotProduct));
     const product = headWorldPosition.clone()
       .sub(this.mesh.position)
       .angleTo(this.headCenterService.getGlobalPosition()
         .sub(this.mesh.position));*/
    return dotProduct;
    /*   return Math.acos(dotProduct);*/
  }

  lookAtToAcetabularCenter() {
    /**
     * Search for acetabular center
     */
    const angleToAcetabular = -this.getAngle();
    this.mesh.rotateOnAxis(new THREE.Vector3(0, 0, this.getCurvedAngle()), angleToAcetabular);
    console.log('Stem angle : ', this.mesh.rotation);
  }

  /**
   * Calcul de la difference entre le position du centrer de la tête tige(word position) et acétabulaire(word position)
   */
  distanceCenter(): THREE.Vector3 {
    return this.stemHead !== undefined ? this.stemHead.getWorldPosition(new THREE.Vector3()).clone()
      .sub(this.meshCenterHead.position.clone()) : new THREE.Vector3();
  }

  distanceCenterV2(scene): Vector3 {
    const distance = Utils.getPositionByObjectName(scene, 'stem-center')
      .clone()
      .sub(Utils.getPositionByObjectName(scene, 'cup-center'));

    console.log("distance center", distance);
    return distance;
  }

  setPosition0() {
    if (this.femurService !== undefined) {
      this.femurService.cut.setPosition0();
      this.femurService.head.setPosition0();
      this.stemHead.setPosition0();
      const positionHead = new THREE.Vector3(-this.getCoordinate().x, 0, this.getCoordinate().z);
      this.stemHead.position.copy(positionHead);
      return this.femurService.cut.mesh.position.equals(new THREE.Vector3(0, 0, 0));
    } else {
      return new THREE.Vector3();
    }
  }

  getCoordinate(): { x, y, z } {
    this.coordinates.forEach((coordinate: Coordinate) => {
      if (coordinate.type === this.range.planification) {
        this.coordinate = coordinate.size[this.size.planification - 1] as { x, y, z };
      }
    });
    return this.coordinate;
  }

  assembly() {
    this.updateCoordinateStemHead();
    this.assemblyToOffsetAndHeight();
  }

  drag() {
  }

  setMaterial() {
    super.setMaterial(this.materialService.createStemMaterial());
  }

  updateCoordinateStemHead() {
    const coordinate = this.getCoordinate();
    this.stemHead.position.set(-coordinate.x, 0, coordinate.z);
  }

  assemblyV2(scene) {
    this.assemblyToOffsetAndHeightV2(scene);
  }
}
