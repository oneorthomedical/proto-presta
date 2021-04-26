import {Injectable} from '@angular/core';
import * as THREE from 'three';
import {LabelService} from './label.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MeshLine, MeshLineMaterial} from 'three.meshline';
import {Color, Vector3} from "three";

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  constructor(private labelService: LabelService) {
  }

  drawCustomLabel(position: THREE.Vector3, distance: number, vec: Vector3, r, g, b, length = 0, name = ''): THREE.Sprite {
    const spritey = this.labelService.makeCustomTextSprite((distance + length).toFixed(0) + ' mm', {
      fontsize: 70,
      backgroundColor: {r: r, g: g, b: b, a: 0.5},
    });
    spritey.scale.multiplyScalar(1.6);
    position.add(vec);
    spritey.position.copy(position);
    spritey.material.depthFunc = THREE.AlwaysDepth;
    spritey.name = name;
    return spritey;
  }


  drawLine(position1: THREE.Vector3, position2: THREE.Vector3, color?: Color, width = 3): THREE.Object3D {
    const object3D = new THREE.Object3D();
    object3D.name = 'line';
    const points = [];
    points.push(position1, position2);
    const lineMesh = new MeshLine();
    lineMesh.setPoints(points, p => width);
    const material = new MeshLineMaterial({
      color: color ? color : 0xFFFF00,
      depthTest: false,
      transparent: true,
      /*blending: THREE.SubtractiveBlending,*/
    });
    const mesh = new THREE.Mesh(lineMesh, material);
    object3D.add(mesh);
    return object3D;
  }
}
