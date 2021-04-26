import {ElementRef, Injectable, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {LoadingManager} from 'three';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  set manager(value: LoadingManager) {
    this._manager = value;
  }

  // tslint:disable-next-line:variable-name
  private _manager = new THREE.LoadingManager();

  constructor() {
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  get manager() {
    this._manager.onStart = this.onStart;
    this._manager.onLoad = this.onLoad;
    this._manager.onProgress = this.onProgress;
    this._manager.onError = this.onError;
    return this._manager;
  }

  onStart(url, itemsLoaded, itemsTotal) {
    console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    if (document.getElementById('spinner') !== null) {
      document.getElementById('spinner').style.display = '';
    }
  }

  onLoad() {
    console.log('Loading complete!');
    if (document.getElementById('spinner') !== null) {
      document.getElementById('spinner').style.display = 'none';
      // @ts-ignore
    }

    if (document.getElementsByClassName('app-loading')[0] !== undefined) {
      // @ts-ignore
      document.getElementsByClassName('app-loading')[0].style.display = 'none';
    }
  }

  onProgress(url, itemsLoaded, itemsTotal) {
    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
  }

  onError(url) {
    console.log('There was an error loading ' + url);
  }
}
