import {Injectable} from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class LightService {

  constructor() {
  }

  create(): THREE.Object3D {
    const lightHolder = new THREE.Object3D();
    const light = new THREE.AmbientLight(0x404040);
    const pointLight = new THREE.PointLight(0xffffff, 0.3);
    pointLight.name = 'pointlight';
    const pointLight2 = new THREE.PointLight(0xffffff, 0.3);
    pointLight2.name = 'pointlight2';
    const pointLight3 = new THREE.PointLight(0xffffff, 0.3);
    pointLight3.name = 'pointLight3';
    light.position.z = 10;
    pointLight.position.z = -1000;
    pointLight3.position.z = 1000;
    lightHolder.add(pointLight3);
    lightHolder.add(pointLight2);
    lightHolder.add(pointLight);
    lightHolder.add(light);
    const hemi = new THREE.HemisphereLight(0xc2c5cc, 0x000000);
    hemi.position.set(0, 20, 0);
    lightHolder.add(hemi);
    hemi.intensity = 0.45;
    const ambientLight = new THREE.AmbientLight(0x3e3d3d, 0.82);
    lightHolder.add(ambientLight);
    return lightHolder;
  }

  createLighting(): THREE.Object3D {
    const lightHolder = new THREE.Object3D();
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    lightHolder.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(3, 10, 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = -2;
    dirLight.shadow.camera.left = -2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    lightHolder.add(dirLight);
    return lightHolder;
  }
}
