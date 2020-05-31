import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class InformacionCompartidaService {
  listaDeUsuarios = [];
  listaDeUsuariosAnonimos = [];
  constructor(
    private dataBase: DatabaseService
  ) { }
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
}
