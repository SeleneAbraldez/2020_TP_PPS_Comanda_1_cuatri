import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabla-productos-por-tipo',
  templateUrl: './tabla-productos-por-tipo.component.html',
  styleUrls: ['./tabla-productos-por-tipo.component.scss'],
})
export class TablaProductosPorTipoComponent implements OnInit {

  @Output() pedidoAlteradoEvent = new EventEmitter<any>();
  @Output() productoEliminadoEvent = new EventEmitter<any>();
  @Input() pedido;
  objectKeys: any;
  constructor() { }
  lista;



  ngOnInit() {
    if (this.pedido.length >= 1) {
      this.lista = this.pedido;
    }
    if (this.pedido.length >= 1) {

      this.lista = this.pedido;
    }
    if (this.pedido.length >= 1) {

      this.lista = this.pedido;
    }
    console.log(this.lista);
  }


  buscarProducto(producto) {
    for (let i = 0; i < this.lista.length; i++) {

      if (producto.nombre == this.lista[i].nombre) {
        return i;
      }
    };
  }

  agregarUnidad(producto) {
    let indice = this.buscarProducto(producto);
    this.lista[indice].cantidad++;
    this.pedidoAlteradoEvent.emit(this.pedido);
    console.log("AGREGAR");
  }
  restarUnidad(producto) {
    let indice = this.buscarProducto(producto);
    if (this.lista[indice].cantidad > 0) {
      this.lista[indice].cantidad--;
    }
    else {
      this.lista.splice(indice, 1);
      this.productoEliminadoEvent.emit();//si borra un producto por completo emito el evento para verificar que aun tenga algo pedido
    }
    this.pedidoAlteradoEvent.emit(this.pedido);
  }
  eliminarProducto(producto) {
    let indice = this.buscarProducto(producto);
    this.lista.splice(indice, 1);
    this.productoEliminadoEvent.emit();//si borra un producto por completo emito el evento para verificar que aun tenga algo pedido
    this.pedidoAlteradoEvent.emit(this.pedido);
  }


}
