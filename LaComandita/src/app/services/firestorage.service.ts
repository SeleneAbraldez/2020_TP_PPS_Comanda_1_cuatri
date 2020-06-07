import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { DatabaseService } from './database.service';
import { InformacionCompartidaService } from './informacion-compartida.service';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {
  storageRef = this.angularFireStorage.storage.ref();
  listaDeImagenes = [];
  listaDeImagenesUsuariosEnEspera = [];
  spinner = false;
  constructor(
    private angularFireStorage: AngularFireStorage,
    private infoService: InformacionCompartidaService
  ) { }
  descomponerNombreDeImagen(imgName: string, link: string) {
    let datos = imgName.split('_');
    let user = datos[0];
    let date = new Date(parseInt(datos[1]));
    let archivo = { 'email': date, 'link': link, 'usuario': user, 'imagen': imgName }
    return archivo;
  }
  obtenerListaDeImagenes() {
    let auxLista = [];
    this.spinner = true;
    this.angularFireStorage.storage.ref().listAll().then((lista) => {
      lista.items.forEach(item => {
        item.getDownloadURL().then((link) => {
          let archivo = this.descomponerNombreDeImagen(item.name, link);
          auxLista.push(archivo);
        });
      });
      setTimeout(() => {
        this.listaDeImagenes = auxLista;
        this.spinner = false;
      }, 3000);
    });
  }
  obtenerListaDeImagenesUsuariosEnEspera() {
    let auxLista = [];
    this.spinner = true;
    this.angularFireStorage.storage.ref().listAll().then((lista) => {
      lista.items.forEach(item => {
        item.getDownloadURL().then((link) => {
          let archivo = this.descomponerNombreDeImagen(item.name, link);
          this.infoService.listaClienteEnEspera.forEach(usuario => {
            if (usuario.imagen == archivo.imagen) {
              usuario['link'] = link;
            }
          })
          auxLista.push(archivo);
        });
      });
    });
    setTimeout(() => {
      this.listaDeImagenesUsuariosEnEspera = auxLista;
      this.spinner = false;
    }, 3000);
  }

}
