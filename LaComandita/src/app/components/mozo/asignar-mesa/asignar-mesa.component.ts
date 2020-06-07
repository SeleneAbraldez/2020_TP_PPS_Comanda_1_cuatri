import { Component, OnInit,Input,EventEmitter, Output } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-asignar-mesa',
  templateUrl: './asignar-mesa.component.html',
  styleUrls: ['./asignar-mesa.component.scss'],
})
export class AsignarMesaComponent implements OnInit {
  @Input() cliente = {};
  lista = [];
  mesaSeleccionada = "";
  mostrarAdvertencia = false;
  @Output() ingresarCliente : EventEmitter<any>=new EventEmitter<any>();
  constructor(
    private dataBase: DatabaseService
  ) { }

  ngOnInit() {
    this.dataBase.obtenerTodos('mesas').subscribe((snapShot) => {
      snapShot.forEach((response: any) => {
        let informacion = response.payload.doc.data();
        informacion['id'] = response.payload.doc.id;
        this.lista.push(informacion);
      });
    })
  }
  mostrarConfirmacion(mesa) {
    this.mesaSeleccionada=mesa;
    this.mostrarAdvertencia = true;
  }

  finalizarAsignacion(){
    this.mostrarAdvertencia=false;
    this.lista.forEach(mesa => {
      if(mesa.codigo==this.mesaSeleccionada)
      {
        mesa.estado='ocupado';//cambio el estado a ocupado
        this.cliente['mesa']=mesa;
        //this.dataBase.actualizar('mesas',this.cliente['mesa'].codigo,mesa)
       // this.dataBase.actualizar('mesas',this.cliente['mesa'].codigo,mesa)
        this.ingresarCliente.emit(this.cliente);
      }
    });
  }
}
