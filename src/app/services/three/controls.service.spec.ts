import {TestBed} from '@angular/core/testing';

import * as THREE from 'three';
import {ControlsService} from './controls.service';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';
import CameraControls from 'camera-controls';


describe('ControlsService', () => {
  let service: ControlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlsService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be return Trackball control', () => {
    const camera = new THREE.PerspectiveCamera();
    const renderer = new THREE.WebGLRenderer();
    expect(service.create(camera, renderer)).toEqual(jasmine.any(TrackballControls));
  });
  it('should be return Camera control', () => {
    const camera = new THREE.PerspectiveCamera();
    const renderer = new THREE.WebGLRenderer();
    expect(service.createCameraControl(camera, renderer)).toEqual(jasmine.any(CameraControls));
  });
});
