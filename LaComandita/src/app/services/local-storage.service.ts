import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  //puntuaciones
  listaDeanyes: any[] = new Array();
  esTop1: boolean = false;
  jugador: any = {};
  //fin puntuaciones 

  constructor() { }

  verificarSiExiteany(emailany) {
    let retorno: boolean = false;
    this.listaDeanyes.forEach(auxany => {
      if (auxany.email == emailany) {
        retorno = true
      }
    });
    return retorno;
  }
  actualizarPuntajeDelUsuario(jugador) {
    this.listaDeanyes.forEach(auxany => {
      if (auxany.email == jugador.email && auxany.puntaje < jugador.puntaje) {
        auxany.puntaje = jugador.puntaje;
        console.log("Lograste una mejor puntuacion");
      }
    });
  }

  verificarSiSuperoAlTopEnMenosIntentos() {
    let retorno = false;
    const auxjugadorTop = null;
    auxjugadorTop.puntaje = 0;

    this.listaDeanyes.forEach(jugador => {
      if (jugador.puntaje < auxjugadorTop.puntaje) {
        auxjugadorTop.puntaje = jugador.puntaje;
        auxjugadorTop.email = jugador.email;
      }
    });
    if (auxjugadorTop.email == this.jugador.email) {
      console.info(auxjugadorTop.email + " " + this.jugador.email);
      console.log("Estas a la cabeza en el top 3");
      retorno = true;
    }
    return retorno;
  }
  verificarSiSuperoAlTop() {
    let retorno = false;
    const auxjugadorTop = null;
    auxjugadorTop.puntaje = 0;

    this.listaDeanyes.forEach(jugador => {
      if (jugador.puntaje > auxjugadorTop.puntaje) {
        auxjugadorTop.puntaje = jugador.puntaje;
        auxjugadorTop.email = jugador.email;
      }
    });
    if (auxjugadorTop.email == this.jugador.email) {
      console.info(auxjugadorTop.email + " " + this.jugador.email);
      console.log("Estas a la cabeza en el top 3");
      retorno = true;
    }
    return retorno;
  }
  guardarPuntuacionEnLocalStorage(emailUsuarioActual, nombreDelJuego, puntaje) {
    if (emailUsuarioActual) {
      this.jugador.email = emailUsuarioActual;
      this.jugador.puntaje = puntaje;
      this.listaDeanyes = this.obtenerListaDeanyes(nombreDelJuego);
      if (this.listaDeanyes && this.listaDeanyes.length > 0) {
        if (this.verificarSiExiteany(emailUsuarioActual)) {
          this.actualizarPuntajeDelUsuario(this.jugador);
        }
        else {
          this.listaDeanyes.push(this.jugador);
        }
      }
      else {
        console.info("LISTA VACIA");
        this.listaDeanyes = [];
        this.listaDeanyes.push(this.jugador);
      }
      localStorage.setItem(nombreDelJuego, JSON.stringify(this.listaDeanyes));
    }
    else {
      console.log("no deberias haber llegado hasta aca sin logear.");
    }
  }

  obtenerListaDeanyes(nombreDelJuego: string) {
    const datosObtenidos = localStorage.getItem(nombreDelJuego);
    if (datosObtenidos) {
      return JSON.parse(datosObtenidos);
    }
  }
}
