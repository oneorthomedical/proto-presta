import {ManagerService} from '../three/manager.service';
import {MaterialService} from '../three/material.service';
import * as THREE from 'three';

describe('EmbaseService', () => {
  let service: ManagerService;
  beforeEach(() => {
    service = new ManagerService();
    const dummyElement = document.createElement('div');
    dummyElement.setAttribute('id', 'spinner');
    document.getElementById = jasmine.createSpy('spinner').and.returnValue(dummyElement);
    const dummyElementLoading = document.createElement('div');
    dummyElementLoading.setAttribute('class', 'app-loading');
    document.getElementsByClassName[0] = jasmine.createSpy('app-loading').and.returnValue(dummyElementLoading);
  });
  it('should be return Manager', () => {
    expect(service.manager).toBeDefined(THREE.LoadingManager);
  });
});
