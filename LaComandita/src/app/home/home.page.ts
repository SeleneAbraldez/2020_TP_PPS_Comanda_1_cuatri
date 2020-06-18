import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  totalAcumulado = 0;
  constructor() { }

  calcularCostoTotal(pedido) {
    this.totalAcumulado = 0;
    pedido.platos.forEach(plato => {
      this.totalAcumulado += plato.cantidad * plato.producto.precio;
    });
    pedido.postres.forEach(postre => {
      this.totalAcumulado += postre.cantidad * postre.producto.precio;
    });
    pedido.bebidas.forEach(bebida => {
      this.totalAcumulado += bebida.cantidad * bebida.producto.precio;
    });
  }
}
