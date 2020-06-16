import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ToastService } from 'src/app/services/toast.service';
import { DatabaseService } from 'src/app/services/database.service';
import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu-productos',
  templateUrl: './menu-productos.component.html',
  styleUrls: ['./menu-productos.component.scss'],
})
export class MenuProductosComponent implements OnInit {

  cantidadPedida: number = 0;
  displayDialog: boolean = false;
  productoSeleccionado = {};
  items: MenuItem[];
  platos$: Observable<any[]>;
  postres$: Observable<any[]>;
  bebidas$: Observable<any[]>;
  activeIndex: number = 0;
  pedido = {
    platos: [],
    bebidas: [],
    postres: [],
  }

  listaDeMensajes = [
    { texto: "Selecciona las comidas que gustes.", tiempo: 2000, color: "secondary", titulo: "Primer paso" },
    { texto: "Selecciona los postres que gustes.", tiempo: 2000, color: "secondary", titulo: "Segundo paso" },
    { texto: "Selecciona las bebidas que gustes.", tiempo: 2000, color: "secondary", titulo: "Tercer paso" },
    { texto: "Esta seguro de que desea formalizar la orden?.", tiempo: 2000, color: "secondary", titulo: "Ultimo paso" }
  ]
  constructor(
    private toast: ToastService,
    private infoService: InformacionCompartidaService
  ) { }
  slideOpts = {
    initialSlide: 0,
    speed: 300,
    onlyExternal: false
  };
  productos = [];
  listaDePlatos = [];
  listaDePostres = [];
  listaDeBebidas = [];

  ngOnInit() {

    //PLATOS
    this.platos$ = this.infoService.obtenerPlatos$();
    this.platos$.subscribe(platos => {
      this.listaDePlatos = platos
      this.productos = this.listaDePlatos;
    });
    this.infoService.actualizarListaDePlatos();
    //FIN PLATOS

    //POSTRES        
    this.postres$ = this.infoService.obtenerPostres$();
    this.postres$.subscribe(postres => {
      this.listaDePostres = postres
    });
    this.infoService.actualizarListaDePostres();
    //FIN POSTRES

    //BEBIDAS    
    this.bebidas$ = this.infoService.obtenerBebidas$();
    this.bebidas$.subscribe(bebidas => {
      this.listaDeBebidas = bebidas
    });
    this.infoService.actualizarListaDeBebidas();
    //FIN BEBIDAS

    this.items = [{
      label: 'Comidas',
    },
    {
      label: 'Postres',
    },
    {
      label: 'Bebidas',
    },
    {
      label: 'Confirmation',
    }
    ];
  }


  mostrarDialog(producto) {
    this.displayDialog = true;
    this.productoSeleccionado = producto;
  }
  agregarProductoAlPedido(tipoDeProducto) {
    let existeProducto: boolean = false;
    if (this.pedido[tipoDeProducto].length >= 1) {//verifico que tenga algo pedido para poder usar el foreach
      this.pedido[tipoDeProducto].forEach(pedido => {
        if (this.productoSeleccionado['nombre'] == pedido.producto.nombre) {//si ya pidio
          pedido.cantidad += this.cantidadPedida;
          existeProducto = true;
        }
      });;
    }
    if (!existeProducto) {//si aun no pidio de este producto
      this.pedido[tipoDeProducto].push({ producto: this.productoSeleccionado, cantidad: this.cantidadPedida });

    }
    console.log(this.pedido);
  }
  agregarAlPedido() {
    let tipoDeProducto = this.productoSeleccionado['tipo'];
    switch (tipoDeProducto) {
      case "platos":
        this.agregarProductoAlPedido(tipoDeProducto);
        break;
      case "bebidas":
        this.agregarProductoAlPedido(tipoDeProducto);
        break;
      case "postres":
        this.agregarProductoAlPedido(tipoDeProducto);
        break;
    }
  }

  cambiarPaso(direccion) {
    switch (direccion) {
      case "anterior":
        this.activeIndex <= 0 ? null : this.activeIndex--;
        break;
      case "siguiente":
        this.activeIndex >= 3 ? null : this.activeIndex++;
        break;
    }
    this.cambiarLista();
    let aviso = this.listaDeMensajes[this.activeIndex];
    this.toast.presentToast(aviso.texto, aviso.tiempo, aviso.color, aviso.titulo);
  }
  cambiarLista() {
    switch (this.activeIndex) {
      case 0:
        this.productos = this.listaDePlatos;
        break;
      case 1:
        this.productos = this.listaDePostres;
        break;
      case 2:
        this.productos = this.listaDeBebidas;
        break;
      case 3:
        break;
    }
  }
}
