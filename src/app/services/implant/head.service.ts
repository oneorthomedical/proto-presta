import {Injectable} from '@angular/core';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import {ManagerService} from '../three/manager.service';
import {MaterialService} from '../three/material.service';
import {Implant} from '../class/implant';
import {BoneService} from '../bone/bone.service';
import {AcetabularCenterService} from '@app/services/element/acetabular-center.service';
import {StemService} from '@app/services/implant/stem.service';
import {HeadCenterService} from '@app/services/element/head-center.service';
import {Euler} from 'three';
import {ToCenterDistancePipe} from '@app/shared/pipe/to-center-distance.pipe';


@Injectable({
  providedIn: 'root'
})
export class HeadService extends Implant {
  public name = 'head';
  angle: Euler;
  /**
   *
   * @param dataSymfonyService
   * @param manager
   * @param materialService
   * @param boneService
   * @param stemService
   * @param headCenterService
   * @param acetabularCenterService
   */
  constructor(public dataSymfonyService: DataSymfonyService, public manager: ManagerService,
              private materialService: MaterialService, private boneService: BoneService,
              private stemService: StemService, private headCenterService: HeadCenterService,
              private acetabularCenterService: AcetabularCenterService) {
    super(manager, dataSymfonyService);
    this.preplanification = this.dataSymfonyService.getHead('opened');
    this.planification = this.dataSymfonyService.getHead('closed');
    this.setParameters();
    this.path = `${location.origin}/assets/hip/${this.side}/${this.name}/${this.range.planification}/${this.size.planification}.obj`;
    this.material = this.materialService.createStandardMaterial();
    this.angle = new Euler(0, 0, -Math.PI / 4);
  }

  setSize(size: string): void {
    super.setSize(size);
    const vectToAdd = this.headCenterService.computeSize(new ToCenterDistancePipe().transform(size), this.angle);
    //TODO
    /* const vec = this.headCenterService.getVectorSphere().clone().add(vectToAdd);*/
   /* const vec = this.stemService.meshCenterHead.position.clone().add(vectToAdd);*/
    const vec = this.headCenterService.headCenterPosition.clone().add(vectToAdd);

    this.stemService.meshCenterHead.position.copy(vec);
    // TODO PROBL7ME DE SNAPPING APRES
   /* this.stemService.setSize(this.stemService.size.planification);*/
  }

  setRange(range: string): void {
    this.range.planification = range;
    this.path = `${location.origin}/assets/hip/${this.side}/${this.name}/${this.range.planification}/${this.size.planification}.obj`;
    if (this.size.planification === '0mm') {
      this.setGeometry().subscribe(geometry => this.mesh.geometry = geometry);
    }
  }

  setRotation() {
    this.mesh.rotation.set(0, -Math.PI / 2, 0);
  }

  snap() {
    this.mesh.position.copy(this.acetabularCenterService.getGlobalPosition());
    this.mesh.rotation.copy(this.angle);
  }

  drag() {
    this.mesh.position.copy(this.acetabularCenterService.getGlobalPosition());
  /*  this.setSize(this.size.planification);*/
  }
}
