import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastService } from 'src/app/services/toast.service';
import { Observable } from 'rxjs';
import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';
@Component({
  selector: 'app-form-consultas',
  templateUrl: './form-consultas.component.html',
  styleUrls: ['./form-consultas.component.scss'],
})
export class FormConsultasComponent implements OnInit {
  @Input() user: any;
  mostrarAdvertencia = false;
  @Input() todo: FormGroup;//agregado el input
  @Output() preguntaCanceladaEvent: EventEmitter<any> = new EventEmitter<any>();

  listaDeconsultas = [];
  consultas$: Observable<any[]>;
  consultaActual: any = {};

  constructor(private formBuilder: FormBuilder,
    private toast: ToastService,
    private infoService: InformacionCompartidaService,
    private dataBase: DatabaseService) {
    this.todo = this.formBuilder.group({
      mensaje: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(150)]],
    });
  }


  ngOnInit() {
    this.consultas$ = this.infoService.obtenerConsultas$();
    this.consultas$.subscribe(consultas => { this.listaDeconsultas = consultas });
    this.infoService.actualizarListaDeConsultasMozo();
    setTimeout(() => {
      this.listaDeconsultas.forEach(consulta => {
        if (this.user.email == consulta.user.email)//si ya tenia una consulta.
        {
          this.consultaActual = consulta;//guardoLaConsultaActual          
        }
      });
    }, 500);
  }

  consultarAlMozo() {

    let consultaPendiente = false;
    this.listaDeconsultas.forEach(consultaMozo => {
      if (consultaMozo.user.email == this.user.email) {
        if (consultaMozo.estado != "respondido") {
          this.toast.presentToast("Debe esperar a que se le responda la ultima consulta antes de hacer una nueva.", 3000, "warning", "Ya Posee una consulta");
          consultaPendiente = true;
        }
      }
    });
    if (!consultaPendiente) {
      this.mostrarAdvertencia = true;
    }
  }
  EnviarConsulta() {
    let consultaGenerada = {
      mensaje: this.todo['mensaje'],
      user: this.user,
      respuesta: "",
      fecha: Date.now(),
      estado: "sin leer"
    }
    if (this.consultaActual.respuesta) {
      this.dataBase.actualizar('consultas', this.consultaActual.id, consultaGenerada);
      console.log(this.consultaActual);
    }
    else {
      this.dataBase.crear('consultas', consultaGenerada);
    }

    this.mostrarAdvertencia = false;
    this.cancelarConsulta();//para cerrar el form una ves enviada la respuesta
    this.toast.presentToast("Se ha enviado la consulta, le avisaremos cuando tenga una respuesta.", 2000, "success", "Consulta enviada");

  }
  cancelarConsulta() {
    this.preguntaCanceladaEvent.emit();
  }
}
