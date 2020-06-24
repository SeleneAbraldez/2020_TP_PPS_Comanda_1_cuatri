import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-lista-de-pedidos-acobrar',
  templateUrl: './lista-de-pedidos-acobrar.component.html',
  styleUrls: ['./lista-de-pedidos-acobrar.component.scss'],
})
export class ListaDePedidosACobrarComponent implements OnInit {
  mostrarDialogCerrarMesa = false;
  listaDePedidos = [];
  pedidoActual;

  pedidosMozo$: Observable<any[]>;
  constructor(private infoService: InformacionCompartidaService,
    private dataBase: DatabaseService,
    private toast: ToastService) { }

  ngOnInit() {
    this.infoService.actualizarListaDeConsultasMozo();
    this.pedidosMozo$ = this.infoService.obtenerPedidosMozo$();
    this.pedidosMozo$.subscribe(pedidos => this.listaDePedidos = pedidos);
    this.infoService.actualizarListaDePedidosMozo();
  }
  cobrarPedido(pedido) {
    this.pedidoActual = pedido;
    this.pedidoActual.estado = "cobrado";
    this.mostrarDialogCerrarMesa = true;
  }
  cerrarMesa(cerrarMesa: boolean) {
    let mesa = this.pedidoActual.cliente.mesa;
    mesa.usos ? mesa.usos++ : mesa.usos = 1;//aumento los usos de las mesas

    if (cerrarMesa) {
      mesa.estado = 'libre';
    }
    //this.dataBase.actualizar('mesas', mesa.id, mesa);
    this.pedidoActual.cliente.mesa = mesa;
    this.pedidoActual.estado = "cerrado";
    //this.dataBase.actualizar('pedidosMozo', this.pedidoActual.id, this.pedidoActual);
    this.aumentarContadorALosPlatosVendidos();
    this.aumentarContadorALosPostresVendidos();
    this.aumentarContadorALosBebidasVendidos();
  }

  aumentarContadorALosPlatosVendidos() {
    if (this.pedidoActual.platos.length >= 1) {
      this.pedidoActual.platos.forEach(plato => {
        plato.producto.cantidadVendida ? plato.producto.cantidadVendida += plato.cantidad : plato.producto.cantidadVendida = plato.cantidad;
        this.dataBase.actualizar('platos', plato.producto.id, plato.producto);

      });
      this.dataBase.actualizar('pedidosMozo', this.pedidoActual.id, this.pedidoActual);
    }
  }
  aumentarContadorALosPostresVendidos() {
    if (this.pedidoActual.postres.length >= 1) {
      this.pedidoActual.postres.forEach(postre => {
        postre.producto.cantidadVendida ? postre.producto.cantidadVendida += postre.cantidad : postre.producto.cantidadVendida = postre.cantidad;
        this.dataBase.actualizar('postres', postre.producto.id, postre.producto);

      });
      this.dataBase.actualizar('pedidosMozo', this.pedidoActual.id, this.pedidoActual);
    }
  }
  aumentarContadorALosBebidasVendidos() {
    if (this.pedidoActual.bebidas.length >= 1) {
      this.pedidoActual.bebidas.forEach(bebida => {
        bebida.producto.cantidadVendida ? bebida.producto.cantidadVendida += bebida.cantidad : bebida.producto.cantidadVendida = bebida.cantidad;
        this.dataBase.actualizar('bebidas', bebida.producto.id, bebida.producto);

      });
      this.dataBase.actualizar('pedidosMozo', this.pedidoActual.id, this.pedidoActual);
    }
  }
}
