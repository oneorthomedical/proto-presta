import {Injectable} from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})

// TODO Design pattern la fabrique
export class RendererService {

  constructor() {
  }

  private _renderer;
  private _rendererFrontal;
  private _rendererSagittal;

  create(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
    this._renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    this._renderer.localClippingEnabled = true;
    this._renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    this._renderer.setClearColor(0xFFFFFF);
    this.renderer.shadowMap.enabled = true;
    return this._renderer;
  }

  createAnonymous(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true

    });
    renderer.localClippingEnabled = true;
    renderer.setSize(canvas.parentElement.parentElement.offsetWidth, canvas.parentElement.parentElement.offsetHeight);
    /*renderer.setClearColor(0x1e1e1e);*/
    renderer.shadowMap.enabled = true;
    return renderer;
  }

  createFrontal(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
    this._rendererFrontal = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    this._rendererFrontal.localClippingEnabled = true;
    this._rendererFrontal.shadowMap.enabled = true;
    this._rendererFrontal.setSize(canvas.offsetWidth, canvas.offsetHeight);
    this._rendererFrontal.setClearColor(0xebebeb);
    this._rendererFrontal.sortObjects = true;
    return this._rendererFrontal;
  }

  createSagittal(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
    this._rendererSagittal = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    this._rendererSagittal.localClippingEnabled = true;
    this._rendererSagittal.setSize(canvas.offsetWidth, canvas.offsetHeight);
    this._rendererSagittal.setClearColor(0xebebeb);
    return this._rendererSagittal;
  }

  get renderer() {
    return this._renderer;
  }

  set renderer(value) {
    this._renderer = value;
  }

  get rendererFrontal() {
    return this._rendererFrontal;
  }

  set rendererFrontal(value) {
    this._rendererFrontal = value;
  }

  get rendererSagittal() {
    return this._rendererSagittal;
  }

  set rendererSagittal(value) {
    this._rendererSagittal = value;
  }

  autoClear() {
    this.renderer.autoClear();
  }
}
