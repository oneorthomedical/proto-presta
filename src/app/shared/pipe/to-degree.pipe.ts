import {Pipe, PipeTransform} from '@angular/core';
import {MathUtils} from 'three';

@Pipe({
  name: 'toDegree'
})
export class ToDegreePipe implements PipeTransform {

  transform(value: number): number {
    return Number(MathUtils.radToDeg(value).toFixed(2));
  }
}
