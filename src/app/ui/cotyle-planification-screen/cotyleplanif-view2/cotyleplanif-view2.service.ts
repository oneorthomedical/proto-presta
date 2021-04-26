import {ElementRef, Injectable, NgZone} from '@angular/core';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import {IRendererOptions} from '@app/shared/interface/Interface';
import {SceneService} from '@app/services/three/scene.service';
import {ControlsService} from '@app/services/three/controls.service';
import {CameraService} from '@app/services/three/camera.service';
import {RendererService} from '@app/services/three/renderer.service';
import {LightService} from '@app/services/three/light.service';
import {DrawService} from '@app/services/three/draw.service';
import {CotyleplanifLoader2Service} from '@app/ui/cotyle-planification-screen/cotyleplanif-view2/cotyleplanif-loader2.service';
import {CotyleplanifView1Service} from '@app/ui/cotyle-planification-screen/cotyleplanif-view1/cotyleplanif-view1.service';
import {Utils} from '@app/services/class/Utils';
import {FrontSide, Mesh, MeshBasicMaterial, MeshPhongMaterial, SphereBufferGeometry} from 'three';
import {CotyleplanifLoader1Service} from "@app/ui/cotyle-planification-screen/cotyleplanif-view1/cotyleplanif-loader1.service";
import {CupService} from '@app/services/implant/cup.service';

@Injectable({
  providedIn: 'root'
})
export class CotyleplanifView2Service {
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
  options: IRendererOptions;
  clock: THREE.Clock;
  delta;
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  INTERSECTED: any;
  cup;

  constructor(private ngZone: NgZone, private sceneService: SceneService, private controlsService: ControlsService,
              private cameraService: CameraService, private rendererService: RendererService,
              private lightService: LightService, public loaderService: CotyleplanifLoader2Service,
              public loader1Service: CotyleplanifLoader1Service, private cupService: CupService,
              private drawLineService: DrawService, private cotyleplanifView1Service: CotyleplanifView1Service) {
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
    this.controls.zoom(1.5);
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
        /**
         * Mesh add
         */
        this.scene.add(...value);
        this.cupService.setGeometry().subscribe(geometry => {
          this.cup = Utils.cloneOriginalCup(this.cotyleplanifView1Service.scene, true , geometry);
          this.scene.add(this.cup);
          // @ts-ignore
          Utils.getMeshByName(this.scene, `pelvis`).material.depthWrite = false;
          // @ts-ignore
          Utils.getMeshByName(this.scene, `pelvis`).material.opacity = 0.6;
          // @ts-ignore
          Utils.getMeshByName(this.scene, `pelvis`).material.side = FrontSide;
          const sphere = new Mesh(new SphereBufferGeometry(1, 50), new MeshPhongMaterial({
            color: 0x00ffd5,
            depthTest: false,
            transparent: true
          }));
          sphere.renderOrder = 1;
          this.cup.add(sphere);
        })

        /*   Utils.getMeshByName(this.scene, 'Cup').children[0].visible = false;*/
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
    this.controls.reset(true);
    this.controls.zoom(1.5);
  }

  screen() {
  }
}
