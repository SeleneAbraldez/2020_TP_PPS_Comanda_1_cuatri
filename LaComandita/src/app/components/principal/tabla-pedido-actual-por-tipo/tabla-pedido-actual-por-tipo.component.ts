import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabla-pedido-actual-por-tipo',
  templateUrl: './tabla-pedido-actual-por-tipo.component.html',
  styleUrls: ['./tabla-pedido-actual-por-tipo.component.scss'],
})
export class TablaPedidoActualPorTipoComponent implements OnInit {

  @Input() pedido;

  constructor() { }
  lista;

  test() {
    console.log(this.pedido);
  }

  ngOnInit() {
    if (this.pedido.length >= 1) {
      this.lista = this.pedido;
    }
  }
}
