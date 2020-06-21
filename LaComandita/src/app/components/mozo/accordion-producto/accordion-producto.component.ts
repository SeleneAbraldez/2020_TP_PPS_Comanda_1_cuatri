import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-accordion-producto',
  templateUrl: './accordion-producto.component.html',
  styleUrls: ['./accordion-producto.component.scss'],
})
export class AccordionProductoComponent implements OnInit, OnDestroy {
  @Input() pedido = []
  @Input() pedidoCompleto = {}
  @Input() titulo = "";
  usuario = {};

  constructor(
    private dataBase: DatabaseService,
    private toast: ToastService,
    private authService: AuthService
  ) { }

  ngOnDestroy() {
    if (this.pedidoCompleto['id']) {
      this.pedidoCompleto[this.titulo.toLocaleLowerCase()] = this.pedido;//al pedido completo le actualizo el sector correspondiente (platos o postres)
      // this.dataBase.actualizar('pedidosMozo', this.pedidoCompleto['id'], this.pedidoCompleto);
    }
  }
  ngOnInit() {
    this.usuario = { tipo: 'cocinero' };//cambiar a currentuser
  }

  cambiarEstadoPedido() {

    let cambioEstado = false;
    this.pedido.forEach(element => {
      switch (element['estado']) {
        case "listo para preparar":
          element['estado'] = "en preparacion";
          cambioEstado = true;
          break;
        case "en preparacion":
          element['estado'] = "listo para servir";
          cambioEstado = true;
          break;
      }
    });

    if (cambioEstado) {
      this.toast.presentToast("", 600, "success", "Listo");
    }
  }
}
