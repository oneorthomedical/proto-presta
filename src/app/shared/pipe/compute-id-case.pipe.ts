import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'computecase'
})
export class ComputeIdCasePipe implements PipeTransform {

  transform(value: string): string {
    let name;
    if (value.length === 3) {
      name = '0' + value;
    } else if (value.length === 2) {
      name = '00' + value;
    } else if (value.length === 1) {
      name = '000' + value;
    } else {
      name = value;
    }
    return name;
  }
}
