import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformarTexto'
})
export class TransformarTextoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let retorno=""
    switch (value) {
      case "listo para preparar":
        retorno="PREPARAR";
        break;
      case "en preparacion":
        retorno="TERMINAR";
        break;
      case "listo para servir":
        break;
    }
    return retorno;
  }

}
