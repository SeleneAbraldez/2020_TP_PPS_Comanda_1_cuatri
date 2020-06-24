import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';

@Component({
  selector: 'app-bartender',
  templateUrl: './bartender.page.html',
  styleUrls: ['./bartender.page.scss'],
})
export class BartenderPage implements OnInit {

  btnEstados = {
    value: 0,
    imagen: "../../../../assets/images/pendientes.png",
    label: "PENDIENTES",
    filtroSeleccionado: 'aceptado'
  };
  listaDeBebidas = [];
  listaPedidosMozo = [];

  pedidosBebidas$: Observable<any[]>;
  pedidosMozo$: Observable<any[]>;

  constructor(private dataBase: DatabaseService,
    private infoService: InformacionCompartidaService) { }

  ngOnInit() {
    this.pedidosBebidas$ = this.infoService.obtenerPedidosBebidas$();
    this.pedidosBebidas$.subscribe(lista => this.listaDeBebidas = lista);
    this.infoService.actualizarListaDePedidosBebidas();

    this.pedidosMozo$ = this.infoService.obtenerPedidosMozo$();
    this.pedidosMozo$.subscribe(lista => this.listaPedidosMozo = lista);
    this.infoService.actualizarListaDePedidosMozo();

  }

  cambiarEstadoOrden($event, ordenCompleta) {
    this.pedidosMozo$ = this.infoService.obtenerPedidosMozo$();
    this.pedidosMozo$.subscribe(lista => this.listaPedidosMozo = lista);
    this.infoService.actualizarListaDePedidosMozo();
    let contadorBebidasTerminados = 0;
    let pedidoMozo = this.buscarPedidoMozoPorId(ordenCompleta.idPedidoMozo);
    // ordenCompleta.estado = $event.estado;
    ordenCompleta.lista.forEach(plato => {
      if (plato.estado == 'listo para servir') {
        contadorBebidasTerminados++;
      }
    });
    if (contadorBebidasTerminados == ordenCompleta.lista.length) {// si estan TODOS los platos listos cambio el estado 
      ordenCompleta.estado = "listo para servir";
      pedidoMozo['estadoBebidas'] = "listo para servir";
      if (this.verificarSiEsElUltimoPedidoAPreparar(pedidoMozo)) {//si era el ultimo pedido a preparar
        pedidoMozo['estado'] = "listo para servir";
        console.log(pedidoMozo);
      }
    }
    console.log(pedidoMozo);
    this.dataBase.actualizar('pedidosMozo', pedidoMozo['id'], pedidoMozo);
    this.dataBase.actualizar('pedidosBebidas', ordenCompleta.id, ordenCompleta);
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
