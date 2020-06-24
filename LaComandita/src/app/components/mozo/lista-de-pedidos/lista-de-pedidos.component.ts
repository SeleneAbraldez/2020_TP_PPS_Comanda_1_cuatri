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
  mostrar(pedido) {
    console.log(pedido);
  }
  ngOnInit() {
    this.infoService.actualizarListaDeConsultasMozo();
    this.pedidosMozo$ = this.infoService.obtenerPedidosMozo$();
    this.pedidosMozo$.subscribe(pedidos => this.listaDePedidos = pedidos);
    this.infoService.actualizarListaDePedidosMozo();



  }
  aceptarPedido(pedido) {
    this.dataBase.obtenerById('usuarios', pedido.cliente.id).subscribe(res => {//actualizo 
      pedido.cliente = res.payload.data();

    });
    pedido.estado = "aceptado";
    pedido.estadoPlatos = "listo para servir";//default ya esta listo
    pedido.estadoPostres = "listo para servir";//default ya esta listo
    pedido.estadoBebidas = "listo para servir";//default ya esta listo
    let auxPedidoPlatos;
    let auxPedidoPostres;
    let auxPedidoBebidas;

    if (pedido['platos'].length >= 1) {
      pedido.estadoPlatos = "aceptado";//en caso de haber pedido se cambia a aceptado
      auxPedidoPlatos = { idPedidoMozo: pedido.id, lista: pedido['platos'], codigoPedido: pedido.codigoPedido, estado: "aceptado" }//JSON
      this.dataBase.crear('pedidosPlatos', auxPedidoPlatos);
    }
    if (pedido['postres'].length >= 1) {
      pedido.estadoPostres = "aceptado";//en caso de haber pedido se cambia a aceptado
      auxPedidoPostres = { idPedidoMozo: pedido.id, lista: pedido['postres'], codigoPedido: pedido.codigoPedido, estado: "aceptado" }//JSON
      this.dataBase.crear('pedidosPostres', auxPedidoPostres);
    }
    if (pedido['bebidas'].length >= 1) {
      pedido.estadoBebidas = "aceptado";//en caso de haber pedido se cambia a aceptado
      auxPedidoBebidas = { idPedidoMozo: pedido.id, lista: pedido['bebidas'], codigoPedido: pedido.codigoPedido, estado: "aceptado" }//JSON
      this.dataBase.crear('pedidosBebidas', auxPedidoBebidas);
    }
    setTimeout(() => {
      this.dataBase.actualizar('pedidosMozo', pedido.id, pedido);
      this.enlazarPedidoConCliente(pedido);//guardo el idPedidoMozo en el cliente
      this.toast.presentToast("El pedido fue aceptado y enviado a preparacion.", 2000, "success", "Pedido aceptado");
    }, 1000);
  }

  enlazarPedidoConCliente(pedido) {
    console.log(pedido);

    pedido.cliente['idPedidoMozo'] = pedido.id;
    this.dataBase.actualizar('usuarios', pedido.cliente.id, pedido.cliente);
  }

  rechazarPedido(pedido) {
    console.log("RECAZAS");
    pedido.estado = "rechazado";
    this.dataBase.actualizar('pedidosMozo', pedido.id, pedido);
    this.toast.presentToast("El pedido fue rechazado ", 2000, "warning", "Pedido rechazado");

  }
  cambiarImagenDeBoton() {
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
    pedido.estadoPlatos = "entregado";
    pedido.estadoPostres = "entregado";
    pedido.estadoBebidas = "entregado";
    pedido.estadoEncuesta = "";
    this.dataBase.actualizar('pedidosMozo', pedido.id, pedido);
  }
}
