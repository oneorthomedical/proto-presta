import {Injectable} from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor() {
  }

  makeTextSprite(message, parameters) {
    message = ` ${message} `;
    if (parameters === undefined) {
      parameters = {};
    }

    const fontface = parameters.hasOwnProperty('fontface') ?
      parameters.fontface : 'Arial';

    const fontsize = parameters.hasOwnProperty('fontsize') ?
      parameters.fontsize : 60;

    const borderThickness = parameters.hasOwnProperty('borderThickness') ?
      parameters.borderThickness : 3;

    const borderColor = parameters.hasOwnProperty('borderColor') ?
      parameters.borderColor : {r: 255, g: 255, b: 255, a: 1.0};

    const backgroundColor = parameters.hasOwnProperty('backgroundColor') ?
      parameters.backgroundColor : {r: 255, g: 255, b: 255, a: 1.0};

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = 'italic ' + fontsize + 'px ' + fontface;

    // get size data (height depends only on font size)
    const metrics = context.measureText(message);
    const textWidth = metrics.width;

    // background color
    context.fillStyle = 'rgba(' + backgroundColor.r + ',' + backgroundColor.g + ','
      + backgroundColor.b + ',' + backgroundColor.a + ')';
    // border color
    context.strokeStyle = 'rgba(' + borderColor.r + ',' + borderColor.g + ','
      + borderColor.b + ',' + borderColor.a + ')';

    context.lineWidth = borderThickness;
    this.roundRect(context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
    // 1.4 is extra height factor for text below baseline: g,j,p,q.

    // text color
    context.fillStyle = 'rgb(9,8,8)';

    context.fillText(message, borderThickness, fontsize + borderThickness);

    // canvas contents will be used for a texture
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    const spriteMaterial = new THREE.SpriteMaterial(
      {
        map: texture,
        depthFunc: THREE.AlwaysDepth
      });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(50, 25, 1.0);
    return sprite;
  }

  makeCustomTextSprite(message, parameters) {
    message = ` ${message} `;
    if (parameters === undefined) {
      parameters = {};
    }

    const fontface = parameters.hasOwnProperty('fontface') ?
      parameters.fontface : 'Arial';

    const fontsize = parameters.hasOwnProperty('fontsize') ?
      parameters.fontsize : 120;

    const borderThickness = parameters.hasOwnProperty('borderThickness') ?
      parameters.borderThickness : 3;

    const borderColor = parameters.hasOwnProperty('borderColor') ?
      parameters.borderColor : {r: 255, g: 255, b: 255, a: 1.0};

    const backgroundColor = parameters.hasOwnProperty('backgroundColor') ?
      parameters.backgroundColor : {r: 255, g: 255, b: 255, a: 1.0};

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = 'italic ' + fontsize + 'px ' + fontface;

    // get size data (height depends only on font size)
    const metrics = context.measureText(message);
    const textWidth = metrics.width;

    // background color
    context.fillStyle = 'rgba(' + backgroundColor.r + ',' + backgroundColor.g + ','
      + backgroundColor.b + ',' + backgroundColor.a + ')';
    // border color
    context.strokeStyle = 'rgba(' + borderColor.r + ',' + borderColor.g + ','
      + borderColor.b + ',' + borderColor.a + ')';

    context.lineWidth = borderThickness;
    this.roundRect(context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
    // 1.4 is extra height factor for text below baseline: g,j,p,q.

    // text color
    context.fillStyle = 'rgb(255,255,255)';

    context.fillText(message, borderThickness, fontsize + borderThickness);

    // canvas contents will be used for a texture
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    const spriteMaterial = new THREE.SpriteMaterial(
      {
        map: texture,
        depthFunc: THREE.AlwaysDepth
      });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(100, 50, 1.0);
    return sprite;
  }

  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

}
