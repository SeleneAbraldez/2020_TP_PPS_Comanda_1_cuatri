import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { ToastService } from './toast.service';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InformacionCompartidaService {
  private consultas$ = new Subject<any[]>();
  private platos$ = new Subject<any[]>();
  private bebidas$ = new Subject<any[]>();
  private postres$ = new Subject<any[]>();

  listaDeUsuarios = [];
  listaClienteEnEspera = [];
  listaDeUsuariosAnonimos = [];
  spinnerSalaDeEspera = true;
  constructor(
    private dataBase: DatabaseService,
    private toast: ToastService
  ) { }
  //BEBIDAS 
  agregarBebidas(bebida: any) {
    this.dataBase.crear('bebidas', bebida);
    this.actualizarListaDeBebidas();
  }
  obtenerBebidas$(): Observable<any[]> {
    return this.bebidas$.asObservable();
  }
  public actualizarListaDeBebidas() {
    this.dataBase.obtenerTodos('bebidas').subscribe((snapShot) => {
      let auxLista = [];
      snapShot.forEach((response: any) => {
        let infoBebida = response.payload.doc.data();
        infoBebida['id'] = response.payload.doc.id;
        auxLista.push(infoBebida);
      });
      this.bebidas$.next(auxLista);
    });
  }
  //FIN BEBIDAS
  //POSTRES 
  agregarPostres(postre: any) {
    this.dataBase.crear('postres', postre);
    this.actualizarListaDePostres();
  }
  obtenerPostres$(): Observable<any[]> {
    return this.postres$.asObservable();
  }
  public actualizarListaDePostres() {
    this.dataBase.obtenerTodos('postres').subscribe((snapShot) => {
      let auxLista = [];
      snapShot.forEach((response: any) => {
        let infoPostre = response.payload.doc.data();
        infoPostre['id'] = response.payload.doc.id;
        auxLista.push(infoPostre);
      });
      this.postres$.next(auxLista);
    });
  }
  //FIN POSTRES
  //PLATOS 
  agregarPlato(plato: any) {
    this.dataBase.crear('platos', plato);
    this.actualizarListaDePlatos();
  }
  obtenerPlatos$(): Observable<any[]> {
    return this.platos$.asObservable();
  }
  public actualizarListaDePlatos() {
    this.dataBase.obtenerTodos('platos').subscribe((snapShot) => {
      let auxLista = [];
      snapShot.forEach((response: any) => {
        let infoPlato = response.payload.doc.data();
        infoPlato['id'] = response.payload.doc.id;
        auxLista.push(infoPlato);
      });
      this.platos$.next(auxLista);
    });
  }
  //FIN PLATOS
  //CONSULTAS 
  agregarConsula(consulta: any) {
    this.dataBase.crear('consultas', consulta);
    this.actualizarListaDeConsultasMozo();
  }
  obtenerConsultas$(): Observable<any[]> {
    return this.consultas$.asObservable();
  }
  public actualizarListaDeConsultasMozo() {
    this.dataBase.obtenerTodos('consultas').subscribe((snapShot) => {
      let auxLista = [];
      snapShot.forEach((response: any) => {
        let infoConsulta = response.payload.doc.data();
        infoConsulta['id'] = response.payload.doc.id;
        auxLista.push(infoConsulta);
      });
      this.consultas$.next(auxLista);
    });
  }
  //FIN CONSULTAS

  public actualizarListaDeUsuariosEnEspera() {
    this.listaClienteEnEspera = [];
    this.dataBase.obtenerTodos('usuarios').subscribe((snapShot) => {
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
    this.dataBase.obtenerTodos('usuarios').subscribe((snapShot) => {
      snapShot.forEach((response: any) => {
        let infoUser = response.payload.doc.data();
        if (infoUser.estado == "anonimo") {
          infoUser['id'] = response.payload.doc.id;
          this.listaDeUsuariosAnonimos.push(infoUser);
        }
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
