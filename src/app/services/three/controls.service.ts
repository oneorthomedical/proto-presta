import {Injectable} from '@angular/core';
import CameraControls from 'camera-controls';
import * as THREE from 'three';
import {PositionUtil} from 'threejs-position-util';
import {Object3D} from 'three';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {
  constructor() {
  }

  private _controls;
  private _controlsFrontal;
  private _controlsSagittal;

  createCameraControl(camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, renderer) {
    CameraControls.install({THREE});
    this._controls = new CameraControls(camera, renderer.domElement);
    return this._controls;
  }

  createAnonymous2DCameraControl(camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, renderer) {
    CameraControls.install({THREE});
    const controls = new CameraControls(camera, renderer.domElement);
    controls.mouseButtons.left = CameraControls.ACTION.NONE;
    controls.moveTo(0, 0, -300);
    controls.zoomTo(0.6);
    return controls;
  }
  createAnonymousCameraControl(camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, renderer) {
    CameraControls.install({THREE});
    const controls = new CameraControls(camera, renderer.domElement);
    return controls;
  }

  createCameraControlFrontal(camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, renderer) {
    CameraControls.install({THREE});
    this._controlsFrontal = new CameraControls(camera, renderer.domElement);
    this._controlsFrontal.mouseButtons.left = CameraControls.ACTION.NONE;
    return this._controlsFrontal;
  }

  createCameraControlSagittal(camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, renderer) {
    CameraControls.install({THREE});
    this._controlsSagittal = new CameraControls(camera, renderer.domElement);
    this._controlsSagittal.mouseButtons.left = CameraControls.ACTION.NONE;
    return this._controlsSagittal;
  }

  setTargetFrontal(object: Object3D) {
    this.controlsFrontal.reset(true);
    // @ts-ignore
    const {x, y, z} = PositionUtil.getGeometryCenterInWorld(object);
    this.controlsFrontal.moveTo(x, 0, z / 2, true);
  }

  setTargetSagittal(object: Object3D) {
    this.controlsSagittal.reset(true);
    // @ts-ignore
    const {x, y, z} = PositionUtil.getGeometryCenterInWorld(object);
    this.controlsSagittal.moveTo(x, 0, z / 2, true);
  }

  get controlsFrontal() {
    return this._controlsFrontal;
  }

  set controlsFrontal(value) {
    this._controlsFrontal = value;
  }

  get controlsSagittal() {
    return this._controlsSagittal;
  }

  set controlsSagittal(value) {
    this._controlsSagittal = value;
  }

  get controls() {
    return this._controls;
  }

  set controls(value) {
    this._controls = value;
  }
}
