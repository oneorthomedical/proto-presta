import {ElementRef, Injectable, NgZone} from '@angular/core';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import {SceneService} from '@app/services/three/scene.service';
import {ControlsService} from '@app/services/three/controls.service';
import {CameraService} from '@app/services/three/camera.service';
import {RendererService} from '@app/services/three/renderer.service';
import {LightService} from '@app/services/three/light.service';
import {FemurplanifLoaderService} from '@app/ui/femur-planification-screen/femurplanif-loader.service';
import {DataDisplayScreenService} from '@app/ui/display-screen/data-display-screen.service';
import {StemService} from '@app/services/implant/stem.service';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import {FemurplanifView1Service} from '@app/ui/femur-planification-screen/femurplanif-view1/femurplanif-view1.service';
import {FrontSide } from 'three';
import {Utils} from '@app/services/class/Utils';

@Injectable({
  providedIn: 'root'
})
export class FemurplanifView4Service {
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
  side: string
  stem;

  constructor(
    private ngZone: NgZone, private sceneService: SceneService, private controlsService: ControlsService,
    private cameraService: CameraService, private rendererService: RendererService,
    private lightService: LightService, public loaderService: FemurplanifLoaderService,
    private dataService: DataDisplayScreenService, private stemService: StemService,
    private dataSymfony: DataSymfonyService, private femurPlanifView1Service: FemurplanifView1Service
  ) {
    this.side = this.loaderService.side;
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
    this.controls.zoom(2);
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
    this.loaderService.getSourceView4().subscribe({
      next: (value) => {
        /**
         * Mesh add
         */
        this.scene.add(...value);
        this.stemService.setGeometry().subscribe(geo => {
          this.stem = Utils.cloneOriginalStem(this.femurPlanifView1Service.scene, true, geo);
          this.scene.add(this.stem);
          // @ts-ignore
          Utils.getMeshByName(this.scene, `femur_cut-${this.side}`).material.depthWrite = false;
          // @ts-ignore
          Utils.getMeshByName(this.scene, `femur_cut-${this.side}`).material.opacity = 0.6;
          // @ts-ignore
          Utils.getMeshByName(this.scene, `femur_cut-${this.side}`).material.side = FrontSide;
          const {x, y, z} = Utils.getPositionByObjectName(this.scene, `femur_cut-${this.side}`);
          this.controls.moveTo(x, y, z);
        })
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

  home() {
    this.controls.reset();
    const {x, y, z} = Utils.getPositionByObjectName(this.scene, `femur_cut-${this.side}`);
    this.controls.moveTo(x, y, z);
    this.controls.zoom(2, true);
  }
}
