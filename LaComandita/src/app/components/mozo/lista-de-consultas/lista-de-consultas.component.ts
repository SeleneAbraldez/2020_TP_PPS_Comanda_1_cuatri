import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
@Component({
  selector: 'app-lista-de-consultas',
  templateUrl: './lista-de-consultas.component.html',
  styleUrls: ['./lista-de-consultas.component.scss'],
})
export class ListaDeConsultasComponent implements OnInit {



  @Input() lista: any[];
  consultaSeleccionada: any={};
  mostrarFormConsulta=false;
  constructor(
    private dataBase:DatabaseService,
  ) { }

  ngOnInit() {

  }

  leerConsulta(consulta) {
    this.mostrarFormConsulta=true;
    this.consultaSeleccionada = consulta;
    this.consultaSeleccionada.estado="leido";
    this.dataBase.actualizar('consultas',this.consultaSeleccionada.id,this.consultaSeleccionada);
  }
}
