import {Injectable} from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {

  constructor() {
  }

  /**
   * @param mesh
   * @param state
   */

  // todo methode pour parse tous les childs
  set(mesh, state: string): void {
    switch (state) {
      case 'on' :
        if (mesh instanceof THREE.Mesh) {
          if (mesh.children.length !== 0) {
            mesh.children.forEach((obj) => {
              // @ts-ignore
              obj.material.visible = true;
              // @ts-ignore
             /* obj.material.transparent = false;*/
              obj.children.forEach((child) => {
                // @ts-ignore
                child.material.visible = true;
                // @ts-ignore
                /*child.material.transparent = false;*/
              });
            });
          }
          mesh.material.visible = true;
          /*mesh.material.transparent = false;*/
        } else {
          mesh.visible = true;
        }
        break;
      case 'off':
        if (mesh instanceof THREE.Mesh) {
          if (mesh.children.length !== 0) {
            mesh.children.forEach((obj) => {
              // @ts-ignore
              obj.material.visible = false;
              obj.children.forEach((child) => {
                // @ts-ignore
                child.material.visible = false;
              });
            });
          }
          mesh.material.visible = false;

        } else {
          mesh.visible = false;
        }
        break;
      case 'transparent':
        if (mesh instanceof THREE.Mesh) {
          if (mesh.children.length !== 0) {
            mesh.children.forEach((obj) => {
              if (!obj.name.includes('Stem')) {
                // @ts-ignore
                obj.material.transparent = true;
                // @ts-ignore
                obj.material.opacity = 0.5;
                obj.children.forEach((child) => {
                  // @ts-ignore
                  child.material.transparent = true;
                  // @ts-ignore
                  child.material.opacity = 0.5;
                });
              }
            });
          }
          if(mesh.name.includes('Pelvis')){
            mesh.material.wireframe = true;
          }
          mesh.material.transparent = true;
          mesh.material.opacity = 0.5;
        }
        break;
      case 'noTransparent' :
        if (mesh instanceof THREE.Mesh) {
          if (mesh.children.length !== 0) {
            mesh.children.forEach((obj) => {
              // @ts-ignore
              obj.material.transparent = false;
              // @ts-ignore
              obj.material.opacity = 1;
              obj.children.forEach((child) => {
                // @ts-ignore
                child.material.transparent = false;
                // @ts-ignore
                child.material.opacity = 1;
              });
            });
          }
          if(mesh.name.includes('Pelvis')){
            mesh.material.wireframe = false;
          }
          mesh.material.transparent = false;
          mesh.material.opacity = 1;
        }
        break;
    }
  }
}
