import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'toCenterDistance'
})
export class ToCenterDistancePipe implements PipeTransform {

  transform(value: string): number {

    switch (value) {
      case '0mm':
        return 0;
        break;
      case '2,5mm':
        return 2.5;
        break;
      case '-2,5mm':
        return -2.5;
        break;
      case '3,5mm':
        return 3.5;
        break;
      case '-3,5mm':
        return -3.5;
        break;
      default:
        return 0;
    }
  }
}
