import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-detallado-del-pedido',
  templateUrl: './detallado-del-pedido.component.html',
  styleUrls: ['./detallado-del-pedido.component.scss'],
})
export class DetalladoDelPedidoComponent implements OnInit {
  @Output() pedidoAlteradoEvent = new EventEmitter<any>();
  @Output() volverAlPasoUnoEvent = new EventEmitter<any>();
  @Output() formalizarPedidoEvent = new EventEmitter<any>();
  

  @Input() pedido = {};

  constructor(private confirmationService: ConfirmationService,
    private authService: AuthService) { }

 

  confirm() {
    this.confirmationService.confirm({
      acceptLabel: "Si",
      message: 'Esta seguro de formalizar el pedido? inmediatamente lo recibira el mozo.',
      accept: () => {
               this.formalizarPedidoEvent.emit(this.pedido);
               //emitir evento y completar los datos del pedido en la pag principal.
      },
      reject: () => {
        console.log("RECHAZO!");
      }
    });
  }
  ngOnInit() { }

  reEmitirEvento(pedido) {
    this.pedidoAlteradoEvent.emit(pedido);
  }

  verificarSiAunTienePedidos() {
    if (this.pedido["platos"].length <= 0 && this.pedido["postres"].length <= 0 && this.pedido["bebidas"].length <= 0)
      this.volverAlPasoUnoEvent.emit();
  }
}
