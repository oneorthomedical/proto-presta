import {ElementRef, Injectable, NgZone} from '@angular/core';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import {ControlsService} from '@app/services/three/controls.service';
import {CameraService} from '@app/services/three/camera.service';
import {RendererService} from '@app/services/three/renderer.service';
import {LightService} from '@app/services/three/light.service';
import {SceneService} from '@app/services/three/scene.service';
import {DisplayscreenView1LoaderService} from '@app/ui/display-screen/displayscreen-view1/displayscreen-view1-loader.service';
import {DrawService} from '@app/services/three/draw.service';
import {PositionUtil} from 'threejs-position-util';
import {Color, Mesh} from 'three';
import {Utils} from '@app/services/class/Utils';

declare global {
  interface Window {
    scene: any;
  }
}
@Injectable({
  providedIn: 'root'
})
export class DisplayscreenView1Service {
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
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  INTERSECTED: any;

  constructor(private ngZone: NgZone, private sceneService: SceneService, private controlsService: ControlsService,
              private cameraService: CameraService, private rendererService: RendererService,
              private lightService: LightService, public loaderService: DisplayscreenView1LoaderService,
              private drawLineService: DrawService) {
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
    this.controls = this.controlsService.createAnonymous2DCameraControl(this.camera, this.renderer);
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
        this.setMesureSacroIlliacToMalleolus();
        this.setMesureGreatTrochToTibialEpine();
        this.setMesureTibialEpineToMalleolus();
      },
      complete: () => {
        this.onComplete = true;
      }
    });
  }

  setMesureSacroIlliacToMalleolus() {
    this.scene.add(this.drawLineService.drawLine(Utils.getPositionByObjectName(this.scene, 'sacro_illiac-left'),
      Utils.getPositionByObjectName(this.scene, 'malleolus_center-left'), new Color('red')));
    this.scene.add(this.drawLineService.drawCustomLabel(Utils.getPositionByObjectName(this.scene, 'sacro_illiac-left'),
      Utils.getDistanceByObjectName('sacro_illiac-left', 'malleolus_center-left', this.scene),
      new THREE.Vector3(-100, 70, 20), 255, 0, 0));
    this.scene.add(this.drawLineService.drawLine(PositionUtil.getGeometryCenterInWorld(this.scene.getObjectByName('sacro_illiac-right') as Mesh),
      PositionUtil.getGeometryCenterInWorld(this.scene.getObjectByName('malleolus_center-right') as Mesh), new Color('red')));
    this.scene.add(this.drawLineService.drawCustomLabel(Utils.getPositionByObjectName(this.scene, 'sacro_illiac-right'),
      Utils.getDistanceByObjectName('sacro_illiac-right', 'malleolus_center-right', this.scene),
      new THREE.Vector3(100, 70, 20), 255, 0, 0));
  }

  setMesureGreatTrochToTibialEpine() {
    this.scene.add(this.drawLineService.drawLine(Utils.getPositionByObjectName(this.scene, 'greater_troch-left'),
      Utils.getPositionByObjectName(this.scene, 'tibial_epine-left'), new Color('blue')));
    this.scene.add(this.drawLineService.drawLine(Utils.getPositionByObjectName(this.scene, 'greater_troch-right'),
      Utils.getPositionByObjectName(this.scene, 'tibial_epine-right'), new Color('blue')));

    this.scene.add(this.drawLineService.drawCustomLabel(Utils.getPositionByObjectName(this.scene, 'greater_troch-left'),
      Utils.getDistanceByObjectName('greater_troch-left', 'tibial_epine-left', this.scene),
      new THREE.Vector3(-70, 70, -Utils.getDistanceByObjectName('greater_troch-left', 'tibial_epine-left', this.scene) / 2), 0, 0, 255));
    this.scene.add(this.drawLineService.drawCustomLabel(Utils.getPositionByObjectName(this.scene, 'greater_troch-right'),
      Utils.getDistanceByObjectName('greater_troch-right', 'tibial_epine-right', this.scene),
      new THREE.Vector3(70, 70, -Utils.getDistanceByObjectName('greater_troch-right', 'tibial_epine-right', this.scene) / 2), 0, 0, 255));
  }

  setMesureTibialEpineToMalleolus() {

    this.scene.add(this.drawLineService.drawLine(Utils.getPositionByObjectName(this.scene, 'tibial_epine-left'),
      Utils.getPositionByObjectName(this.scene, 'malleolus_center-left'), new Color('green')));

    this.scene.add(this.drawLineService.drawCustomLabel(Utils.getPositionByObjectName(this.scene, 'tibial_epine-left'),
      Utils.getDistanceByObjectName('tibial_epine-left', 'malleolus_center-left', this.scene),
      new THREE.Vector3(-100, 70, -Utils.getDistanceByObjectName('tibial_epine-left', 'malleolus_center-left', this.scene) / 2),
      0, 255, 0));

    this.scene.add(this.drawLineService.drawLine(Utils.getPositionByObjectName(this.scene, 'tibial_epine-right'),
      Utils.getPositionByObjectName(this.scene, 'malleolus_center-right'), new Color('green')));

    this.scene.add(this.drawLineService.drawCustomLabel(Utils.getPositionByObjectName(this.scene, 'tibial_epine-right'),
      Utils.getDistanceByObjectName('tibial_epine-right', 'malleolus_center-right', this.scene),
      new THREE.Vector3(100, 70, -Utils.getDistanceByObjectName('tibial_epine-right', 'malleolus_center-right', this.scene) / 2),
      0, 255, 0));
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
}
