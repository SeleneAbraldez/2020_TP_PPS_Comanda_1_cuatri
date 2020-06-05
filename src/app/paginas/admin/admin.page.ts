import { Component, OnInit } from '@angular/core';

import { ToastService } from 'src/app/services/toast.service';
import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';
import { DatabaseService } from 'src/app/services/database.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  spinnerSalaDeEspera = true;
  listaEnEspera = [];
  leftMenu = false;
  rightMenu = false;
  mostrarFormRegistro = false;
  mostrarGraficoEstadistico = false;
  user: any = {};
  currentUser: any = {};
  imagen: string;
  graficoSeleccionado = "bar";
  constructor(
    private infoService: InformacionCompartidaService,
    private toast: ToastService,
    private dataBase: DatabaseService,
    private authService: AuthService,
    private fireStore: FirestorageService

  ) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.dataBase.obtenerTodos('anonimos').subscribe(res => {
      this.infoService.listaClienteEnEspera = res;
    });
  }
  mostrarForm(perfil) {
    this.infoService.actualizarListaDeUsuarios();
    // this.user = { 'perfil': perfil, 'imagen': '' };
    this.user.perfil = perfil;
    this.user.imagen = '';
    this.mostrarFormRegistro = true;
  }
  mostrarGrafico(grafico) {
    this.mostrarGraficoEstadistico = true;
    this.graficoSeleccionado = grafico;
    this.rightMenu = false;
  }
  cargarListaDeEspera() {
    this.infoService.actualizarListaDeUsuariosEnEspera();
    this.fireStore.obtenerListaDeImagenesUsuariosEnEspera();
    this.listaEnEspera = this.infoService.listaClienteEnEspera;
  }


  mostrarListaDeEspera() {
    this.cargarListaDeEspera();
    setTimeout(() => {

      this.spinnerSalaDeEspera = false;
    }, 2400);
  }
}
