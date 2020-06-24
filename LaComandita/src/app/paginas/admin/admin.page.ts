import { Component, OnInit } from '@angular/core';

import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  val: number;
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
    private dataBase: DatabaseService,
    private authService: AuthService,

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
}
