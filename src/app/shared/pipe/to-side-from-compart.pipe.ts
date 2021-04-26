import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'toSideFromCompart'
})
export class ToSideFromCompartPipe implements PipeTransform {

  transform(side: string, compartment: string): string {
    if ((side === 'right' && compartment === 'internal') || (side === 'left' && compartment === 'external')) {
       return 'right';
    } else {
      return 'left';
    }
  }
}
