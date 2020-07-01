import { Component, OnInit } from '@angular/core';

import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

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
  usuariosSinVerificar$: Observable<any[]>;
  listaUsuariosSinVerificar = [];
  constructor(
    private infoService: InformacionCompartidaService,
    private dataBase: DatabaseService,
    private toast: ToastService,
    private authService: AuthService,

  ) { }

  ngOnInit() {

    this.usuariosSinVerificar$ = this.infoService.obtenerUsuariosSinVerificar$();
    this.usuariosSinVerificar$.subscribe(usuarios => {
      this.listaUsuariosSinVerificar = usuarios;
      if (this.listaUsuariosSinVerificar.length >= 1) {
        this.toast.presentToast("", 2000, "primary", "Nuevos Clientes");
      }
    });
    this.infoService.actualizarListaUsuariosSinVerificar();

    this.currentUser = {
      apellido: "alvares",
      cuil: "20-45462542-7",
      dni: "45462542",
      email: "supervisor@gmail.com",
      id: "ue67bZLSjTp1ofeDeBXb",
      imagen: "supervisor@gmail.com_1591065112584.jpg",
      nombre: "juan",
      password: "supervisor",
      perfil: "supervisor",
      verificado: true
    };
    // this.currentUser = this.authService.currentUser;
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
  mostrarListaDeClientesAVerificar() {
    console.log(this.listaUsuariosSinVerificar);
  }
}
