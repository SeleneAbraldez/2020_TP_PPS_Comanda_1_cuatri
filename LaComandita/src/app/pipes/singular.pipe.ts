import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'singular'
})
export class SingularPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let retorno = ""
    for (let i = 0; i < value.length; i++) {
      if (i != (value.length - 1)) {
        retorno += value[i];
      }
    }
    return retorno;
  }

}
