import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'toOnlyNumbers'
})
export class ToOnlyNumbersPipe implements PipeTransform {
  transform(value: string): string {
    const regex = /-?(\d*,)*\d+(?=[mM]{2})/;
    return value.match(regex)[0];
  }


}
