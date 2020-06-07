import { Component, OnInit } from '@angular/core';
import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-mozo',
  templateUrl: './mozo.page.html',
  styleUrls: ['./mozo.page.scss'],
})
export class MozoPage implements OnInit {
  spinnerSalaDeEspera = true;
  listaEnEspera = [];
  mostrarFormProductos=false;
  mostrarSalaDeEspera=false;
  
  constructor(
    private infoService: InformacionCompartidaService,
    private fireStore: FirestorageService,
    private dataBase:DatabaseService
  ) { }

  ngOnInit() {
    
  }
  cargarListaDeEspera() {
    this.infoService.actualizarListaDeUsuariosEnEspera();
    this.fireStore.obtenerListaDeImagenesUsuariosEnEspera();
    this.listaEnEspera = this.infoService.listaClienteEnEspera;
  }


  mostrarListaDeEspera() {
    this.mostrarSalaDeEspera=true;
    this.cargarListaDeEspera();
    setTimeout(() => {
      this.spinnerSalaDeEspera = false;
    }, 2400);
  }
}
