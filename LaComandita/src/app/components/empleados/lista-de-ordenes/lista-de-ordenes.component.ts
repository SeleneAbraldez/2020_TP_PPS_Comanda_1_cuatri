import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-lista-de-ordenes',
  templateUrl: './lista-de-ordenes.component.html',
  styleUrls: ['./lista-de-ordenes.component.scss'],
})
export class ListaDeOrdenesComponent implements OnInit {
  listaDePedidos = [];
  checkBox = {
    value: null,
    label: "PENDIENTES",
    filtroSeleccionado: 'aceptado',
    accionBoton: 'preparar'
  };
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


  cambiarTituloCheckBox() {
    switch (this.checkBox.value) {
      case false:
        this.checkBox.label = "LISTO PARA SERVIR";
        this.checkBox.filtroSeleccionado = "listo para servir";
        break;
      case true:
        this.checkBox.label = "EN PREPARACION";
        this.checkBox.filtroSeleccionado = "en preparacion";
        break;
      default:
        this.checkBox.label = "PENDIENTES";
        this.checkBox.filtroSeleccionado = "aceptado";
        break;
    }
  }

}
