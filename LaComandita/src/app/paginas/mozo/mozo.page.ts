import { Component, OnInit } from '@angular/core';
import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-mozo',
  templateUrl: './mozo.page.html',
  styleUrls: ['./mozo.page.scss'],
})
export class MozoPage implements OnInit {
  spinnerSalaDeEspera = true;
  listaEnEspera = [];
  listaDeconsultas = [];
  mostrarListaDePedidosACobrar = false;
  mostrarFormProductos = false;
  mostrarListadoDeConsultas = false;
  mostrarSalaDeEspera = false;
  mostrarListaDePedidos = false;
  consultas$: Observable<any[]>;
  listaSalaDeEspera$: Observable<any[]>;


  constructor(
    private infoService: InformacionCompartidaService,
    private fireStore: FirestorageService,
    private dataBase: DatabaseService,
    private toast: ToastService

  ) { }

  ngOnInit() {
    //lista de consultas
    this.consultas$ = this.infoService.obtenerConsultas$();
    this.consultas$.subscribe(consulas => {
      let cartasSinLeer = false;
      this.listaDeconsultas = consulas;
      if (this.listaDeconsultas.length >= 1) {
        this.listaDeconsultas.forEach(carta => {
          if (carta.estado == 'sin leer') {
            cartasSinLeer = true;
          }
        });
        cartasSinLeer ? this.toast.presentToast("", 2000, "primary", "Nuevas consultas") : null;//si hay cartas sin leer, notifico
      }
    });
    this.infoService.actualizarListaDeConsultasMozo();
    //fin lista de consultas
    this.listaSalaDeEspera$ = this.infoService.obtenerListaSalaDeEspera$();
    this.listaSalaDeEspera$.subscribe(usuarios => {
      this.listaEnEspera = usuarios;
      if (this.listaEnEspera.length >= 1) {
        this.toast.presentToast("", 2000, "primary", "Clientes en espera");
      }
    });
    this.infoService.actualizarListaSalaDeEspera();


  }

  cargarListaDeEspera() {
    // this.infoService.actualizarListaDeUsuariosEnEspera();
    // this.fireStore.obtenerListaDeImagenesUsuariosEnEspera();
    // this.listaEnEspera = this.infoService.listaClienteEnEspera;
  }


  mostrarListaDeEspera() {
    this.mostrarSalaDeEspera = true;
    // this.cargarListaDeEspera();
    setTimeout(() => {
      this.spinnerSalaDeEspera = false;
    }, 2400);
  }

  mostrarListaDeConsultas() {
    // this.infoService.obtenerConsultas$();
    this.mostrarListadoDeConsultas = true;
  }
  mostrarListaDepedidos() {

  }
}
