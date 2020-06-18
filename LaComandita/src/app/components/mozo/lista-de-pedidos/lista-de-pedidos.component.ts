import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';

@Component({
  selector: 'app-lista-de-pedidos',
  templateUrl: './lista-de-pedidos.component.html',
  styleUrls: ['./lista-de-pedidos.component.scss'],
})
export class ListaDePedidosComponent implements OnInit {
  listaDePedidos = [];
  pedidosMozo$: Observable<any[]>;

  constructor(private infoService: InformacionCompartidaService) { }

  ngOnInit() {
    this.infoService.actualizarListaDeConsultasMozo();

    this.pedidosMozo$ = this.infoService.obtenerPedidosMozo$();
    this.pedidosMozo$.subscribe(pedidos => this.listaDePedidos = pedidos);
    this.infoService.actualizarListaDePedidosMozo();
  }

}
