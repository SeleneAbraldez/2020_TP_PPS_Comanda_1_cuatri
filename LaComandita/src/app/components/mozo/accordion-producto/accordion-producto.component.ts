import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-accordion-producto',
  templateUrl: './accordion-producto.component.html',
  styleUrls: ['./accordion-producto.component.scss'],
})
export class AccordionProductoComponent implements OnInit {
  @Input() pedido = []
  @Input() pedidoCompleto = {}
  @Input() titulo = "";
  usuario = {};

  constructor(
    private dataBase: DatabaseService,
    private toast: ToastService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

}
