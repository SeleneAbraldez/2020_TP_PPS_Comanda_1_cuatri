import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-form-consulta',
  templateUrl: './form-consulta.component.html',
  styleUrls: ['./form-consulta.component.scss'],
})
export class FormConsultaComponent implements OnInit {

  @Input() consulta: any;
  mostrarAdvertencia = false;
  @Input() todo: FormGroup;//agregado el input
  @Output() respuestaCanceladaEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder,
    private toast: ToastService,
    private dataBase: DatabaseService) {
    this.todo = this.formBuilder.group({
      mensaje: ['', [Validators.required, Validators.maxLength(150)]],
    });
  }

  ngOnInit() { }

  responderPregunta() {
    this.mostrarAdvertencia = true;
  }
  enviarRespuesta() {
    this.mostrarAdvertencia = false;
    let consultaGenerada = this.consulta;
    consultaGenerada.estado = "respondido";
    consultaGenerada["respuesta"] = this.todo['mensaje']
    this.dataBase.actualizar('consultas', this.consulta.id, consultaGenerada);
    this.toast.presentToast("", 2000, "success", "Respuesta enviada");
    this.cancelarConsulta();
  }
  cancelarConsulta() {
    this.respuestaCanceladaEvent.emit();
  }

}
