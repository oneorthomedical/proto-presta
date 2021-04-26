import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'toidcase'
})
export class ToIdCasePipe implements PipeTransform {

  transform(value: string): string {
    if (value.includes('DS')) {
      return value.split('DS')[1];
    }
    return value;
  }
}
