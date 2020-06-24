import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cocinero',
  templateUrl: './cocinero.page.html',
  styleUrls: ['./cocinero.page.scss'],
})
export class CocineroPage implements OnInit {
  btnEstados = {
    value: 0,
    imagen: "../../../../assets/images/pendientes.png",
    label: "PENDIENTES",
    filtroSeleccionado: 'aceptado'
  };
  listaDePlatos = [];
  listaDePostres = [];
  listaPedidosMozo = [];

  pedidosPlatos$: Observable<any[]>;
  pedidosPostres$: Observable<any[]>;
  pedidosMozo$: Observable<any[]>;

  constructor(private dataBase: DatabaseService,
    private infoService: InformacionCompartidaService) { }

  ngOnInit() {
    this.pedidosPlatos$ = this.infoService.obtenerPedidosPlatos$();
    this.pedidosPlatos$.subscribe(lista => this.listaDePlatos = lista);
    this.infoService.actualizarListaDePedidosPlatos();

    this.pedidosPostres$ = this.infoService.obtenerPedidosPostres$();
    this.pedidosPostres$.subscribe(lista => this.listaDePostres = lista);
    this.infoService.actualizarListaDePedidosPostres();

    this.pedidosMozo$ = this.infoService.obtenerPedidosMozo$();
    this.pedidosMozo$.subscribe(lista => this.listaPedidosMozo = lista);
    this.infoService.actualizarListaDePedidosMozo();

  }

  cambiarEstadoOrdenPlatos($event, ordenCompleta) {
    this.pedidosMozo$ = this.infoService.obtenerPedidosMozo$();
    this.pedidosMozo$.subscribe(lista => this.listaPedidosMozo = lista);
    this.infoService.actualizarListaDePedidosMozo();
    let pedidoMozo = this.buscarPedidoMozoPorId(ordenCompleta.idPedidoMozo);
    let contadorPlatosTerminados = 0;
    // ordenCompleta.estado = $event.estado;
    ordenCompleta.lista.forEach(plato => {
      if (plato.estado == 'listo para servir') {
        contadorPlatosTerminados++;
      }
    });
    if (contadorPlatosTerminados == ordenCompleta.lista.length) {// si estan TODOS los platos listos cambio el estado 
      ordenCompleta.estado = "listo para servir";
      pedidoMozo['estadoPlatos'] = "listo para servir";
      if (this.verificarSiEsElUltimoPedidoAPreparar(pedidoMozo)) {//si era el ultimo pedido a preparar
        pedidoMozo['estado'] = "listo para servir";
      }
      console.log(pedidoMozo);
    }
    this.dataBase.actualizar('pedidosMozo', pedidoMozo['id'], pedidoMozo);
    this.dataBase.actualizar('pedidosPlatos', ordenCompleta.id, ordenCompleta);

  }
  verificarSiEsElUltimoPedidoAPreparar(pedidoMozo) {
    if (
      pedidoMozo['estadoPlatos'] == 'listo para servir' &&
      pedidoMozo['estadoPostres'] == 'listo para servir' &&
      pedidoMozo['estadoBebidas'] == 'listo para servir') {
      return true;
    }
    return false;
  }
  buscarPedidoMozoPorId(idPedidoMozo) {
    let retorno = {};
    this.listaPedidosMozo.forEach(pedido => {
      if (pedido.id == idPedidoMozo) {
        retorno = pedido;
      }
    });
    return retorno;
  }
  cambiarEstadoOrdenPostres($event, ordenCompleta) {
    this.pedidosMozo$ = this.infoService.obtenerPedidosMozo$();
    this.pedidosMozo$.subscribe(lista => this.listaPedidosMozo = lista);
    this.infoService.actualizarListaDePedidosMozo();
    let contadorPlatosTerminados = 0;
    let pedidoMozo = this.buscarPedidoMozoPorId(ordenCompleta.idPedidoMozo);
    ordenCompleta.lista.forEach(plato => {
      if (plato.estado == 'listo para servir') {
        contadorPlatosTerminados++;
      }
    });
    if (contadorPlatosTerminados == ordenCompleta.lista.length) {// si estan TODOS los platos listos cambio el estado 
      ordenCompleta.estado = "listo para servir";
      pedidoMozo['estadoPostres'] = "listo para servir";
      if (this.verificarSiEsElUltimoPedidoAPreparar(pedidoMozo)) {//si era el ultimo pedido a preparar
        pedidoMozo['estado'] = "listo para servir";
      }
    }
    this.dataBase.actualizar('pedidosMozo', pedidoMozo['id'], pedidoMozo);
    this.dataBase.actualizar('pedidosPostres', ordenCompleta.id, ordenCompleta);
  }
  cambiarImagenDeBoton() {
    this.btnEstados.value += 1;
    switch (this.btnEstados.value) {
      case 1:
        this.btnEstados.label = "LISTO PARA SERVIR";
        this.btnEstados.filtroSeleccionado = "listo para servir";
        this.btnEstados.imagen = "../../../../assets/images/servir.png";
        break;
      default:
        this.btnEstados.value = 0;
        this.btnEstados.label = "PENDIENTES";
        this.btnEstados.filtroSeleccionado = "aceptado";
        this.btnEstados.imagen = "../../../../assets/images/pendientes.png";
        break;
    }
  }
}
