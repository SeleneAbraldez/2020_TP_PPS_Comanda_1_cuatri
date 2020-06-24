import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detalle-pedido-actual',
  templateUrl: './detalle-pedido-actual.component.html',
  styleUrls: ['./detalle-pedido-actual.component.scss'],
})
export class DetallePedidoActualComponent implements OnInit {
  @Input() pedido = {};
  // mostrarEncuestaDeSatisfaccion = false;
  constructor() { }


  ngOnInit() { }


}
