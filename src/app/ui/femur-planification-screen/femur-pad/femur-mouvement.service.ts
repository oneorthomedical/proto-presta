import {Injectable} from '@angular/core';
import {StemService} from '@app/services/implant/stem.service';
import {FemurplanifView4Service} from '@app/ui/femur-planification-screen/femurplanif-view4/femurplanif-view4.service';
import {Utils} from '@app/services/class/Utils';
import {MathUtils} from 'three';
import {FemurplanifView1Service} from '@app/ui/femur-planification-screen/femurplanif-view1/femurplanif-view1.service';
import {DataDisplayScreenService} from '@app/ui/display-screen/data-display-screen.service';

@Injectable({
  providedIn: 'root'
})
export class FemurMouvementService {
  arrayService: Array<any>;

  constructor(public stemService: StemService,
              private femur1Service: FemurplanifView1Service,
              private femur4Service: FemurplanifView4Service,
              private dataService: DataDisplayScreenService) {
    this.arrayService = [femur4Service];
  }

  leftFrontal() {
    this.stemService.mesh.position.x += 1;
    this.update();
    this.stemService.save();
  }

  rightFrontal() {
    this.stemService.mesh.position.x -= 1;
    this.update();
    this.stemService.save();
  }

  rotateLeftFrontal() {
    this.stemService.mesh.rotation.y += MathUtils.degToRad(1);
    this.updateAxis();
    this.update();
    this.stemService.save();
  }

  rotateRightFrontal() {
    this.stemService.mesh.rotation.y -= MathUtils.degToRad(1);
    this.updateAxis();
    this.update();
    this.stemService.save();
  }

  leftSagittal() {
    this.stemService.mesh.position.y -= 1;
    this.update();
    this.stemService.save();
  }

  rightSagittal() {
    this.stemService.mesh.position.y += 1;
    this.update();
    this.stemService.save();
  }

  rotateLeftSagittal() {
    this.stemService.mesh.rotation.x -= MathUtils.degToRad(1);
    this.update();
    this.stemService.save();
  }

  rotateRightSagittal() {
    this.stemService.mesh.rotation.x += MathUtils.degToRad(1);
    this.update();
    this.stemService.save();
  }

  rotateLeftHorizontal() {
    this.stemService.mesh.rotation.z -= MathUtils.degToRad(1);
    this.dataService.data.stemAnteversion = this.stemService.mesh.rotation.z;
    this.update();
    this.stemService.save();
  }

  rotateRightHorizontal() {
    this.stemService.mesh.rotation.z += MathUtils.degToRad(1);
    this.dataService.data.stemAnteversion = this.stemService.mesh.rotation.z;
    this.update();
    this.stemService.save();
  }

  minusSize(bool = true) {
    this.stemService.setSize(this.stemService.size.planification - 1);
    if (bool) {
      this.updateAxis();
      this.updateGeometry();
    }
    this.stemService.save();
  }

  plusSize(bool = true) {
    this.stemService.setSize(this.stemService.size.planification + 1);
    if (bool) {
      this.updateAxis();
      this.updateGeometry();
    }
    this.stemService.save();
  }

  setVara(bool = true) {
    this.stemService.setRange('vara');
    if (bool) {
      this.updateAxis();
      this.updateGeometry();
    }
    this.stemService.save();
  }

  setStd(bool = true) {
    this.stemService.setRange('std');
    if (bool) {
      this.updateAxis();
      this.updateGeometry();
    }
    this.stemService.save();
  }

  updateGeometry() {
    this.stemService.setGeometry().subscribe(geometry => {
      this.arrayService.forEach(service => {
        Utils.getMeshByName(service.scene, 'Stem')
          .geometry = geometry;
      })
    })
  }

  update() {
    this.arrayService.forEach(service => {
      Utils.getMeshByName(service.scene, 'Stem')
        .position.copy(this.stemService.mesh.position);
      Utils.getMeshByName(service.scene, 'Stem')
        .rotation.copy(this.stemService.mesh.rotation);
    })
  }

  updateAxis() {
  }
}
