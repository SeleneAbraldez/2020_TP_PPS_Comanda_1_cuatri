import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'milisecondsToDate'
})
export class MilisecondsToDatePipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): unknown {

    let retorno = new Date(value);
    let fechaActual = new Date(Date.now());
    if (fechaActual.getDay() == retorno.getDay() && fechaActual.getMonth() == retorno.getMonth()) {
      return retorno.getHours() + ":" + retorno.getMinutes() + ":" + retorno.getSeconds();
    }
    return value;
  }

}
