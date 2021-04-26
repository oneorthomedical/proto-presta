import {Injectable} from '@angular/core';
import {MaterialService} from "@app/services/three/material.service";
import * as THREE from "three";

@Injectable({
  providedIn: 'root'
})
export class FemurSliderHelperService {

  planeX;
  planeY;
  planeZ;

  constructor(private material: MaterialService) {
    this.createPlanZIndicator();
    this.createPlanYIndicator();
    this.createPlanXIndicator();
  }

  createPlanXIndicator() {
    const geometry = new THREE.CylinderBufferGeometry(0.2, 0.2, 600);
    const material = this.material.setPlan();
    this.planeX = new THREE.Mesh(geometry, material);
    this.planeX.rotation.set(Math.PI / 2, 0, 0);
    return this.planeX;
  }

  updateX(value) {
    this.planeX.position.x = value;
  }

  createPlanYIndicator() {
    const geometry = new THREE.CylinderBufferGeometry(0.2, 0.2, 600);
    const material = this.material.setPlan();
    this.planeY = new THREE.Mesh(geometry, material);
    this.planeY.rotation.set(Math.PI / 2, 0, 0);
    return this.planeY;
  }

  updateY(value) {
    this.planeY.position.y = value;
  }

  createPlanZIndicator() {
    const geometry = new THREE.CylinderBufferGeometry(0.2, 0.2, 600);
    const material = this.material.setPlan();
    this.planeZ = new THREE.Mesh(geometry, material);
    this.planeZ.rotation.set(0, 0, -Math.PI / 2);
    return this.planeY;
  }

  updateZ(value) {
    this.planeZ.position.z = value;
  }
}
