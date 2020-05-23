import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {
  storageRef = this.angularFireStorage.storage.ref();
  listaDeImagenes = [];
  spinner = false;
  constructor(
    private angularFireStorage: AngularFireStorage,
  ) { }
  descomponerNombreDeImagen(imgName: string, link: string) {
    let datos = imgName.split('_');
    let user = datos[0];
    let date = new Date(parseInt(datos[1]));
    let type = datos[2].split('.')[0];
    let archivo = { 'fecha': date, 'link': link, 'usuario': user, 'tipo': type, 'imgName': imgName }
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
}
