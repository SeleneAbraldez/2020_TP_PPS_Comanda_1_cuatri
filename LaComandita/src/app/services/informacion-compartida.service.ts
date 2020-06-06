import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class InformacionCompartidaService {
  listaDeUsuarios = [];
  listaClienteEnEspera = [];
  listaDeUsuariosAnonimos = [];
  spinnerSalaDeEspera = true;
  constructor(
    private dataBase: DatabaseService,
    private toast: ToastService
  ) { }
  public actualizarListaDeUsuariosEnEspera() {
    this.listaClienteEnEspera = [];
    this.dataBase.obtenerTodos('anonimos').subscribe((snapShot) => {
      snapShot.forEach((response: any) => {
        let infoUser = response.payload.doc.data();
        infoUser['id'] = response.payload.doc.id;
        if (infoUser.ubicado == 'salaDeEspera') {
          this.listaClienteEnEspera.push(infoUser);
        }
      });
    })
  }
  public actualizarListaDeUsuarios() {
    this.listaDeUsuarios = [];
    this.dataBase.obtenerTodos('usuarios').subscribe((snapShot) => {
      snapShot.forEach((response: any) => {
        let infoUser = response.payload.doc.data();
        infoUser['id'] = response.payload.doc.id;
        this.listaDeUsuarios.push(infoUser);
      });
    })
  }
  public actualizarListaDeUsuariosAnonimos() {
    this.listaDeUsuariosAnonimos = [];
    this.dataBase.obtenerTodos('anonimos').subscribe((snapShot) => {
      snapShot.forEach((response: any) => {
        let infoUser = response.payload.doc.data();
        infoUser['id'] = response.payload.doc.id;
        this.listaDeUsuariosAnonimos.push(infoUser);
      });
    })
  }

  public verificarExistenciaDeUsuario(user) {
    let retorno = false;
    this.actualizarListaDeUsuarios();
    setTimeout(() => {
      this.listaDeUsuarios.forEach(usuario => {
        if (usuario.dni == user.dni) {
          this.toast.presentToast("Un usuario ya fue creado con ese DNI", 2000, 'danger', 'Usuario existente');
          retorno = true;
        }
        else if (usuario.email == user.email) {
          this.toast.presentToast("Un usuario ya fue creado con ese Correo", 2000, 'danger', 'Usuario existente');
          retorno = true;
        }
      });
    }, 200);
    return retorno;
  }
}
