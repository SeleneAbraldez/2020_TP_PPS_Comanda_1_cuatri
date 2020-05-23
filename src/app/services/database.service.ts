import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  constructor(private firestore: AngularFirestore,
    ) {
  }

  //Crea un nuevo dato
  public crear(collection: string, data: any) {
    return this.firestore.collection(collection).add(data);
  }
  //Obtiene un datoS
  public obtenerById(collection: string, documentId: string) {
    return this.firestore.collection(collection).doc(documentId).snapshotChanges();
  }
  //Obtiene todos los datos
  public obtenerTodos(collection) {
    return this.firestore.collection(collection).snapshotChanges();
  }
  //Actualiza un dato
  public actualizar(collection: string, documentId: string, data: any) {
    return this.firestore.collection(collection).doc(documentId).set(data);
  }


  //#region MODO DE USO
  /*leerTodasLasVotaciones(collection) {
    this.database.obtenerTodos(collection).subscribe((snapShot) => {
      snapShot.forEach((response: any) => {
        let informacion = response.payload.doc.data();
        informacion['id'] = response.payload.doc.id;
        this.listaDeVotaciones.push(informacion);
      });
    })
  }*/
  //#endregion
}
