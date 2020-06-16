import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-muestreo',
  templateUrl: './muestreo.component.html',
  styleUrls: ['./muestreo.component.scss'],
})
export class MuestreoComponent implements OnInit {
  @Input() producto = {}
  @Output() agregarALaOrdenEvent = new EventEmitter<any>();
  @Output() pasoSiguienteEvent = new EventEmitter<any>();
  @Output() pasoAnteriorEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit() { }

  emitirEvento() {
    this.agregarALaOrdenEvent.emit(this.producto);
  }
  emitirPasoAnteriorEvent() {
    this.pasoAnteriorEvent.emit();
  }
  emitirPasoSiguienteEvent() {
    this.pasoSiguienteEvent.emit();
  }
}
