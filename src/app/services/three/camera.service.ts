import {Injectable} from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class CameraService {


  private _camera;
  private _cameraFrontal;
  private _cameraSagittal;

  constructor() {
  }

  create(canvas: HTMLCanvasElement): THREE.OrthographicCamera {
    this._camera = new THREE.OrthographicCamera(
      canvas.offsetWidth / -2,
      canvas.offsetWidth / 2,
      canvas.offsetHeight / 2,
      canvas.offsetHeight / -2,
      0.1,
      1000
    );
    this._camera.position.set(0, 300, 0);
    this._camera.up.set(0, 0, 1);
    this.camera.zoom = 2;
    return this._camera;
  }

  createAnonymous(canvas: HTMLCanvasElement): THREE.OrthographicCamera {
    const camera = new THREE.OrthographicCamera(
      canvas.offsetWidth / -2,
      canvas.offsetWidth / 2,
      canvas.offsetHeight / 2,
      canvas.offsetHeight / -2,
      1,
      1000
    );
    camera.position.set(0, 250, 0);
    camera.up.set(0, 0, 1);
    return camera;
  }
  set camera(value) {
    this._camera = value;
  }

  get camera() {
    return this._camera;
  }

  get cameraFrontal() {
    return this._cameraFrontal;
  }

  set cameraFrontal(value) {
    this._cameraFrontal = value;
  }

  get cameraSagittal() {
    return this._cameraSagittal;
  }

  set cameraSagittal(value) {
    this._cameraSagittal = value;
  }
}
