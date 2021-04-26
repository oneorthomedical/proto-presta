import {ElementRef, EventEmitter, Injectable, NgZone} from '@angular/core';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import {ControlsService} from '@app/services/three/controls.service';
import {CameraService} from '@app/services/three/camera.service';
import {RendererService} from '@app/services/three/renderer.service';
import {LightService} from '@app/services/three/light.service';
import {SceneService} from '@app/services/three/scene.service';
import {DisplayscreenView2LoaderService} from '@app/ui/display-screen/displayscreen-view2/displayscreen-view2-loader.service';
import {Utils} from '@app/services/class/Utils';
import {DataSymfonyService} from '@app/api/data-symfony.service';
import {DataDisplayScreenService} from '@app/ui/display-screen/data-display-screen.service';
import {BoxHelper, MathUtils, Mesh, MeshNormalMaterial, RingBufferGeometry} from 'three';

@Injectable({
  providedIn: 'root'
})
export class DisplayscreenView2Service {
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  camera: THREE.OrthographicCamera;
  scene: THREE.Scene;
  controls: CameraControls;

  meshParent: THREE.Object3D;
  lightParent: THREE.Object3D;
  cameraParent: THREE.Object3D;
  frameId: number = null;
  clock: THREE.Clock;
  delta;
  side;

  constructor(private ngZone: NgZone, private sceneService: SceneService, private controlsService: ControlsService,
              private cameraService: CameraService, private rendererService: RendererService,
              private lightService: LightService, public loaderService: DisplayscreenView2LoaderService,
              private dataService: DataDisplayScreenService, private dataSymfonyService: DataSymfonyService) {
    this.side = this.dataSymfonyService.getSide();

  }

  createScene(canvas: ElementRef<HTMLCanvasElement>) {
    this.scene = this.sceneService.createAnonymous();
    this.meshParent = new THREE.Object3D();
    this.cameraParent = new THREE.Object3D();
    this.clock = new THREE.Clock();
    this.meshParent.name = '3D view 2';
    this.canvas = canvas.nativeElement;
    this.renderer = this.rendererService.createAnonymous(this.canvas);
    this.camera = this.cameraService.createAnonymous(this.canvas);
    this.controls = this.controlsService.createAnonymousCameraControl(this.camera, this.renderer);
    this.lightParent = this.lightService.create();
    this.camera.lookAt(this.controls.getTarget(new THREE.Vector3()));
    this.scene.add(this.meshParent, this.lightParent);
    this.cameraParent.add(this.camera);
  }

  loadObject() {
    this.loaderService.getSource().subscribe({
      next: (value) => {
        /**
         * Mesh add
         */
        this.scene.add(...value);
        const sizeBox1 = Utils.getMeshByName(this.scene, `diaphyseal_neck_axis-${this.side}`).geometry.boundingBox.getSize(new THREE.Vector3());
        const sizeBox2 = Utils.getMeshByName(this.scene, `femoral_neck_axis-${this.side}`).geometry.boundingBox.getSize(new THREE.Vector3());
        const alphaFemoral = Utils.getAtan(sizeBox2.z, sizeBox2.x);
        const alphaDiaphysaire = Utils.getAtan(sizeBox1.x, sizeBox2.z);
        const boneCCD = alphaFemoral + 90 - alphaDiaphysaire;
        const femurOffset = Utils.getPositionByObjectName(this.scene, `greater_troch-${this.side}`)
          .distanceTo(Utils.getPositionByObjectName(this.scene, `acetabular-center-${this.side}`));
        this.dataService.data.boneCCD = boneCCD;
        this.dataService.data.femurOffset = femurOffset;
        const plane = new THREE.Plane();
        /*  plane.applyMatrix4(Utils.getMeshByName(this.scene, `acetabular-center-${this.side}`).matrix)*/
        plane.setFromCoplanarPoints(
          Utils.getPositionByObjectName(this.scene, `acetabular-center-${this.side}`),
          Utils.getPositionByObjectName(this.scene, `acetabular_upper_edge-${this.side}`),
          Utils.getPositionByObjectName(this.scene, `acetabular_psoas-${this.side}`),
        );
        const helper = new THREE.PlaneHelper(plane, 100, 0xff0000);
        helper.children[0].position.x = 1.94;
        helper.children[0].position.y = -0.42;
        helper.children[0].name = 'plan';
        // @ts-ignore
        helper.children[0].material.opacity = 0.5;
        // @ts-ignore
        helper.material.transparent = true;
        // @ts-ignore
        helper.material.opacity = 0;
        // @ts-ignore
        helper.children[0].material.wireframe = true;
        this.dataService.data.cotyleInclinaison = MathUtils.radToDeg(plane.normal.angleTo(new THREE.Vector3(0, 0, 1)));
        this.dataService.data.cotyleAnteversion = MathUtils.radToDeg(plane.normal.angleTo(new THREE.Vector3(0, -1, 0)));
        this.dataService.data.planHelper = helper;
        helper.children[0].renderOrder = 0;
        this.scene.add(helper);
        const {x, y, z} = Utils.getPositionByObjectName(this.scene, `acetabular-center-${this.side}`);
        this.controls.moveTo(x, y, z);
        this.controls.zoom(2)
      },
      complete: () => {
      }
    });
  }

  public animate(): void {
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

  public render(): void {
    this.delta = this.clock.getDelta();
    this.controls.update(this.delta);
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
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

  home() {
    this.controls.reset(true);
    const {x, y, z} = Utils.getPositionByObjectName(this.scene, `acetabular-center-${this.side}`);
    this.controls.moveTo(x, y, z);
    this.controls.zoom(2)
  }
}
