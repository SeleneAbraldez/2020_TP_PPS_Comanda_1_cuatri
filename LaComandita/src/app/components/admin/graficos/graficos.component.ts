import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss'],
})
export class GraficosComponent implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  @Input() filtro = "listaPlatos";
  productoSeleccionado: any;
  data: any;
  lista: any;
  platos$: Observable<any[]>;
  bebidas$: Observable<any[]>;
  postres$: Observable<any[]>;
  listaPlatos = [];
  listaPostres = [];
  listaBebidas = [];
  listaTodos = [];
  listaDeColores = ['lightblue', 'lightcoral', 'lightseagreen', 'magenta', 'midnightblue', 'orange', 'plum', 'royalblue', 'turquoise', 'yellowgreen',
    'red', 'rebeccapurple', 'saddlebrown', 'seashell', 'teal', 'blue'];

  @Input() tipoDeGrafico: any = 'bar';
  constructor(
    private infoService: InformacionCompartidaService
  ) {

  }

  ngOnInit() {
    switch (this.tipoDeGrafico) {
      case 'bar':
        this.graficoBarras();
        break;
      case 'pie':
        this.graficoTorta();
        break;
      case 'polarArea':
        this.graficoPolarArea();
        break;
    }
    this.platos$ = this.infoService.obtenerPlatos$();
    this.platos$.subscribe(platos => {
      this.listaPlatos = platos;
      this.actualizarListaTodos();
    });
    this.infoService.actualizarListaDePlatos();

    this.bebidas$ = this.infoService.obtenerBebidas$();
    this.bebidas$.subscribe(bebidas => {
      this.listaBebidas = bebidas;
      this.actualizarListaTodos();
    });
    this.infoService.actualizarListaDeBebidas();

    this.postres$ = this.infoService.obtenerPostres$();
    this.postres$.subscribe(postres => {
      this.listaPostres = postres;
      this.actualizarListaTodos();
    });
    this.infoService.actualizarListaDePostres();

    setTimeout(() => {
      console.log(this.lista);

    }, 1500);
  }
  actualizarListaTodos() {
    this.listaTodos = [];
    this.listaPlatos.forEach(plato => {
      this.listaTodos.push(plato);
    });
    this.listaPostres.forEach(postre => {
      this.listaTodos.push(postre);
    });
    this.listaBebidas.forEach(bebida => {
      this.listaTodos.push(bebida);
    });
  }
  graficoTorta() {
    setTimeout(() => {
      this.lista = this[this.filtro];
      let labels = this.lista.map((element) => {
        return element.nombre;
      });
      let data = this.lista.map((element) => {
        return element.cantidadVendida;
      });
      this.data = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: this.listaDeColores,
            hoverBackgroundColor: this.listaDeColores
          }]
      };
    }, 750);
  }
  graficoPolarArea() {
    setTimeout(() => {

      this.lista = this[this.filtro];
      let labels = this.lista.map((element) => {
        return element.nombre;
      });
      let data = this.lista.map((element) => {
        return element.cantidadVendida;
      });
      this.data = {
        datasets: [{
          data: data,
          backgroundColor: this.listaDeColores,
          label: 'My dataset'
        }],
        labels: labels
      }
    }, 750);
  }

  graficoBarras() {
    setTimeout(() => {

      this.lista = this[this.filtro];
      let datasets = this.lista.map((element) => {
        let color = this.listaDeColores[Math.floor(Math.random() * (this.listaDeColores.length - 0)) + 0];
        let auxiliar = {
          label: element.nombre,
          backgroundColor: color,
          borderColor: color,
          data: [element.cantidadVendida]
        }
        return auxiliar;
      });
      this.data = {
        labels: ['Cantidad vendida'],
        datasets: datasets
      }
    }, 750);
  }

  actualizarLista(filtro) {
    this.filtro = filtro;
    switch (this.tipoDeGrafico) {
      case 'bar':
        this.graficoBarras();
        break;
      case 'pie':
        this.graficoTorta();
        break;
      case 'polarArea':
        this.graficoPolarArea();
        break;
      case 'todos':
        this.graficoPolarArea();
        break;
    }
  }
  buscarProductoPorNombre(nombre) {
    this.listaTodos.forEach(producto => {
      if (producto.nombre == nombre) {
        this.productoSeleccionado = producto;
      }
    })
  }
  selectData(e: any) {
    let nombreProductoSeleccionado;
    switch (this.tipoDeGrafico) {
      case 'bar':
        console.log(e.element._view.datasetLabel);
        nombreProductoSeleccionado = e.element._view.datasetLabel;
        break;
      case 'pie':
      case 'polarArea':
        nombreProductoSeleccionado = e.element._view.label;
        break;
    }
    this.buscarProductoPorNombre(nombreProductoSeleccionado);

  }
}
