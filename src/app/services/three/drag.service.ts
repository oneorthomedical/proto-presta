import {Injectable} from '@angular/core';
import {SplineService} from '@app/services/three/spline.service';
import {DiaphysealNeckAxisService} from '@app/services/element/diaphyseal-neck-axis.service';

@Injectable({
  providedIn: 'root'
})
export class DragService {
  dragControlsFrontal;
  dragControlsSagittal;
  dragCupDeAssembly;

  constructor(
    private splineService: SplineService, private diaphysealNeckAxisService: DiaphysealNeckAxisService) {
  }

  createAxisDraggableV2(scene, sphereUp, sphereDown) {
    scene.add(sphereUp, sphereDown);
    this.diaphysealNeckAxisService.line.mesh = this.splineService.getCurve(sphereUp, sphereDown);
    this.diaphysealNeckAxisService.line.mesh.visible = false;
    scene.add(this.diaphysealNeckAxisService.line.mesh);
  }
}
