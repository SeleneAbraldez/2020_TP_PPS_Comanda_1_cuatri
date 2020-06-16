import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precio'
})
export class PrecioPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return "$"+value+".00";
  }

}
