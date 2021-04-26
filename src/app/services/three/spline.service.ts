import {Injectable} from '@angular/core';
import {Mesh} from 'three';
import {DrawService} from '@app/services/three/draw.service';


@Injectable({
  providedIn: 'root'
})
export class SplineService {

  constructor(private drawService: DrawService) {
  }

  getCurve(sphereUp: Mesh, sphereDown: Mesh) {
    sphereUp.geometry.computeBoundingSphere();
    sphereDown.geometry.computeBoundingSphere();
    return this.drawService.drawLine(
      sphereUp.geometry.boundingSphere.center.clone().add(sphereUp.position),
      sphereDown.geometry.boundingSphere.center.clone().add(sphereDown.position));
  }
}
