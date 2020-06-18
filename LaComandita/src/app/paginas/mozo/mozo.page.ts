import { Component, OnInit } from '@angular/core';
import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mozo',
  templateUrl: './mozo.page.html',
  styleUrls: ['./mozo.page.scss'],
})
export class MozoPage implements OnInit {
  spinnerSalaDeEspera = true;
  listaEnEspera = [];
  listaDeconsultas = [];

  mostrarFormProductos = false;
  mostrarListadoDeConsultas = false;
  mostrarSalaDeEspera = false;
  consultas$: Observable<any[]>;


  constructor(
    private infoService: InformacionCompartidaService,
    private fireStore: FirestorageService,
    private dataBase: DatabaseService,

  ) { }

  ngOnInit() {
    this.consultas$ = this.infoService.obtenerConsultas$();
    this.consultas$.subscribe(consulas => this.listaDeconsultas = consulas);


  }
  cargarListaDeEspera() {
    this.infoService.actualizarListaDeUsuariosEnEspera();
    this.fireStore.obtenerListaDeImagenesUsuariosEnEspera();
    this.listaEnEspera = this.infoService.listaClienteEnEspera;
  }


  mostrarListaDeEspera() {
    this.mostrarSalaDeEspera = true;
    this.cargarListaDeEspera();
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
