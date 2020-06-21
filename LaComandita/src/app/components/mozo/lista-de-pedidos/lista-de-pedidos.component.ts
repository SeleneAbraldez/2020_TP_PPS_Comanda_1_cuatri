import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-lista-de-pedidos',
  templateUrl: './lista-de-pedidos.component.html',
  styleUrls: ['./lista-de-pedidos.component.scss'],
})
export class ListaDePedidosComponent implements OnInit {
  btnEstados = {
    value: 0,
    imagen: "../../../../assets/images/pendientes.png",
    label: "PENDIENTES",
    filtroSeleccionado: 'enviado'
  };
  listaDePedidos = [];

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
  aceptarPedido(pedido) {
    pedido.estado = "aceptado";
    this.dataBase.actualizar('pedidosMozo', pedido.id, pedido);
    this.toast.presentToast("El pedido fue aceptado y enviado a preparacion.", 2000, "success", "Pedido aceptado");
  }
  rechazarPedido(pedido) {
    console.log("RECAZAS");
    pedido.estado = "rechazado";
    this.dataBase.actualizar('pedidosMozo', pedido.id, pedido);
    this.toast.presentToast("El pedido fue rechazado ", 2000, "warning", "Pedido rechazado");

  }
  hacerMagia() {
    this.btnEstados.value += 1;
    switch (this.btnEstados.value) {
      case 0:
        this.btnEstados.label = "PENDIENTES";
        this.btnEstados.filtroSeleccionado = "enviado";
        this.btnEstados.imagen = "../../../../assets/images/pendientes.png";
        break;
      case 1:
        this.btnEstados.label = "ACEPTADOS";
        this.btnEstados.filtroSeleccionado = "aceptado";
        this.btnEstados.imagen = "../../../../assets/images/aceptado.png";
        break;
      case 2:
        this.btnEstados.label = "RECHAZADOS";
        this.btnEstados.filtroSeleccionado = "rechazado";
        this.btnEstados.imagen = "../../../../assets/images/rechazados.png";
        break;
      case 3:
        this.btnEstados.label = "LISTO PARA SERVIR";
        this.btnEstados.filtroSeleccionado = "listo para servir";
        this.btnEstados.imagen = "../../../../assets/images/servir.png";
        break;
      default:
        this.btnEstados.value = 0;
        this.btnEstados.label = "PENDIENTES";
        this.btnEstados.filtroSeleccionado = "enviado";
        this.btnEstados.imagen = "../../../../assets/images/pendientes.png";
        break;
    }
  }

  servirPedido(pedido) {
    pedido.estado = "entregado";
    console.log(pedido);
    // this.dataBase.actualizar('pedidosMozo', pedido.id, pedido);
  }
}
