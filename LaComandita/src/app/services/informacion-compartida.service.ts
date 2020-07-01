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
  private pedidosMozo$ = new Subject<any[]>();
  private pedidosPlatos$ = new Subject<any[]>();
  private pedidosPostres$ = new Subject<any[]>();
  private pedidosBebidas$ = new Subject<any[]>();
  private usuariosAnonimos$ = new Subject<any[]>();
  private usuariosSinVerificar$ = new Subject<any[]>();
  private listaSalaDeEspera$ = new Subject<any[]>();


  listaDeUsuarios = [];
  // listaClienteEnEspera = [];
  // listaDeUsuariosAnonimos = [];
  spinnerSalaDeEspera = true;
  constructor(
    private dataBase: DatabaseService,
    private toast: ToastService
  ) { }

    //LISTA SALA DE ESPERA
    obtenerListaSalaDeEspera$(): Observable<any[]> {
      return this.listaSalaDeEspera$.asObservable();
    }
    public actualizarListaSalaDeEspera() {
      this.dataBase.obtenerTodos('usuarios').subscribe((snapShot) => {
        let auxLista = [];
        snapShot.forEach((response: any) => {
          let infoUsuario = response.payload.doc.data();
          infoUsuario['id'] = response.payload.doc.id;
          if(infoUsuario.ubicado == 'salaDeEspera')
          {
            auxLista.push(infoUsuario);
          }
        });
        this.listaSalaDeEspera$.next(auxLista);
      });
    }
    //FIN LISTA SALA DE ESPERA
   //USUARIOS SIN VERIFICAR 
   obtenerUsuariosSinVerificar$(): Observable<any[]> {
    return this.usuariosSinVerificar$.asObservable();
  }
  public actualizarListaUsuariosSinVerificar() {
    this.dataBase.obtenerTodos('usuarios').subscribe((snapShot) => {
      let auxLista = [];
      snapShot.forEach((response: any) => {
        let infoUsuario = response.payload.doc.data();
        infoUsuario['id'] = response.payload.doc.id;
        if(!infoUsuario.verificado)
        {
          auxLista.push(infoUsuario);
        }
      });
      this.usuariosSinVerificar$.next(auxLista);
    });
  }
  //FIN USUARIOS SIN VERIFICAR
  //PEDIDOS bebidas
  obtenerPedidosBebidas$(): Observable<any[]> {
    return this.pedidosBebidas$.asObservable();
  }
  public actualizarListaDePedidosBebidas() {
    this.dataBase.obtenerTodos('pedidosBebidas').subscribe((snapShot) => {
      let auxLista = [];

      snapShot.forEach((response: any) => {
        let infoPedido = response.payload.doc.data();
        infoPedido['id'] = response.payload.doc.id;
        auxLista.push(infoPedido);
      });
      this.pedidosBebidas$.next(auxLista);
    });
  }
  //FIN PEDIDOS BEBIDAS
  //PEDIDOS POSTRES
  obtenerPedidosPostres$(): Observable<any[]> {
    return this.pedidosPostres$.asObservable();
  }
  public actualizarListaDePedidosPostres() {
    this.dataBase.obtenerTodos('pedidosPostres').subscribe((snapShot) => {
      let auxLista = [];

      snapShot.forEach((response: any) => {
        let infoPedido = response.payload.doc.data();
        infoPedido['id'] = response.payload.doc.id;
        auxLista.push(infoPedido);
      });
      this.pedidosPostres$.next(auxLista);
    });
  }
  //FIN PEDIDOS POSTRES
  //PEDIDOS Platos 
  obtenerPedidosPlatos$(): Observable<any[]> {
    return this.pedidosPlatos$.asObservable();
  }
  public actualizarListaDePedidosPlatos() {
    this.dataBase.obtenerTodos('pedidosPlatos').subscribe((snapShot) => {
      let auxLista = [];

      snapShot.forEach((response: any) => {
        let infoPedido = response.payload.doc.data();
        infoPedido['id'] = response.payload.doc.id;
        auxLista.push(infoPedido);
      });
      this.pedidosPlatos$.next(auxLista);
    });
  }
  //FIN PEDIDOS platos
  //PEDIDOS MOZO 
  agregarPedido(pedido: any) {
    this.dataBase.crear('pedidosMozo', pedido);
    this.actualizarListaDePedidosMozo();
  }
  obtenerPedidosMozo$(): Observable<any[]> {
    return this.pedidosMozo$.asObservable();
  }
  public actualizarListaDePedidosMozo() {
    this.dataBase.obtenerTodos('pedidosMozo').subscribe((snapShot) => {
      let auxLista = [];

      snapShot.forEach((response: any) => {
        let infoPedido = response.payload.doc.data();
        infoPedido['id'] = response.payload.doc.id;
        auxLista.push(infoPedido);
      });
      this.pedidosMozo$.next(auxLista);
    });
  }
  //FIN PEDIDOS MOZO

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
 /* public actualizarListaDeUsuariosEnEspera() {
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
  }*/
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
 /* public actualizarListaDeUsuariosAnonimos() {
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
  }*/

  //PEDIDOS USUARIOS ANONIMOS
  obtenerUsuariosAnonimos$(): Observable<any[]> {
    return this.usuariosAnonimos$.asObservable();
  }
  public actualizarListaUsuariosAnonimos() {
    this.dataBase.obtenerTodos('usuarios').subscribe((snapShot) => {
      let auxLista = [];
      snapShot.forEach((response: any) => {
        let infoUser = response.payload.doc.data();
        if (infoUser.estado == "anonimo") {
          infoUser['id'] = response.payload.doc.id;
          auxLista.push(infoUser);
        }
      });
      this.usuariosAnonimos$.next(auxLista);
    });
    
  }
  //FIN USUARIOS ANONIMOS

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
