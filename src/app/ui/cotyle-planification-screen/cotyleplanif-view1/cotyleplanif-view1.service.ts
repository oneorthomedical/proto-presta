import {ElementRef, Injectable, NgZone} from '@angular/core';
import * as THREE from 'three';
import {SceneService} from '@app/services/three/scene.service';
import {ControlsService} from '@app/services/three/controls.service';
import {CameraService} from '@app/services/three/camera.service';
import {RendererService} from '@app/services/three/renderer.service';
import {LightService} from '@app/services/three/light.service';
import CameraControls from 'camera-controls';
import {CotyleplanifLoader1Service} from '@app/ui/cotyle-planification-screen/cotyleplanif-view1/cotyleplanif-loader1.service';

@Injectable({
  providedIn: 'root'
})
export class CotyleplanifView1Service {
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  camera: THREE.OrthographicCamera;
  scene: THREE.Scene;
  controls: CameraControls;
  meshParent: THREE.Object3D;
  lightParent: THREE.Object3D;
  cameraParent: THREE.Object3D;
  frameId: number = null;
  onComplete = false;
  clock: THREE.Clock;
  delta;
  valueClipY;
  clipPlanesY: Array<any>;
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  INTERSECTED: any;
  display3D = false;
  maxClipOnY;
  originNiiY;
  classIs3D = 'visible';
  is3D = false;
  classIs3Cup3D = 'visible';
  isCup3D = false;
  CONSTANT_SLIDER = 1;

  constructor(private ngZone: NgZone, private sceneService: SceneService, private controlsService: ControlsService,
              private cameraService: CameraService, private rendererService: RendererService,
              private lightService: LightService, public loaderService: CotyleplanifLoader1Service) {
  }

  createScene(canvas: ElementRef<HTMLCanvasElement>) {
    this.scene = this.sceneService.createAnonymous();
    this.meshParent = new THREE.Object3D();
    this.cameraParent = new THREE.Object3D();
    this.clock = new THREE.Clock();
    this.meshParent.name = '3D';
    this.canvas = canvas.nativeElement;
    this.renderer = this.rendererService.createAnonymous(this.canvas);
    this.camera = this.cameraService.createAnonymous(this.canvas);
    this.controls = this.controlsService.createAnonymousCameraControl(this.camera, this.renderer);
    this.lightParent = this.lightService.create();
    this.camera.lookAt(this.controls.getTarget(new THREE.Vector3()));
    this.scene.add(this.meshParent, this.lightParent);
    this.cameraParent.add(this.camera);
  }

  animate() {
    this.ngZone.runOutsideAngular(() => {
      window.THREE = THREE;
      window.scene = this.scene;
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }
      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  loadObject() {
    this.loaderService.getSource().subscribe({
      next: (value) => {
        this.scene.add(...value);
        this.loaderService.compute();
      },
      complete: () => {
        this.onComplete = true;
      }
    });
  }

  resize(): void {
    if (this.renderer) {
      this.ngZone.runOutsideAngular(() => {
        const width = this.canvas.parentElement.parentElement.offsetWidth;
        const height = this.canvas.parentElement.parentElement.offsetHeight;
        this.camera.left = width / -2;
        this.camera.right = width / 2;
        this.camera.top = height / 2;
        this.camera.bottom = height / -2;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
      });
    }
  }

  public render(): void {
    this.delta = this.clock.getDelta();
    this.controls.update(this.delta);
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
    this.renderer.render(this.scene, this.camera);
  }

}
