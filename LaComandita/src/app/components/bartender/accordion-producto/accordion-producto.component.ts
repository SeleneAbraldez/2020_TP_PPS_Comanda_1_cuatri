import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-accordion-producto',
  templateUrl: './accordion-producto.component.html',
  styleUrls: ['./accordion-producto.component.scss'],
})
export class AccordionProductoComponent implements OnInit {

  @Input() pedido: any;
  @Input() titulo = "";
  @Output() prepararEvent = new EventEmitter<any>();
  @Output() terminarEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit() { }

  preparar(producto) {
    if (producto.estado == 'listo para preparar') {
      producto.estado = 'en preparacion';
      this.prepararEvent.emit(producto);
    }
  }
  terminar(producto) {
    if (producto.estado == 'en preparacion') {
      producto.estado = 'listo para servir';
      this.terminarEvent.emit(producto);
    }
  }

}
