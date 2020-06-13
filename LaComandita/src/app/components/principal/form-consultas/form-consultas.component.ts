import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-form-consultas',
  templateUrl: './form-consultas.component.html',
  styleUrls: ['./form-consultas.component.scss'],
})
export class FormConsultasComponent implements OnInit {
  @Input() user: any;
  mostrarAdvertencia = false;
  todo: FormGroup;
  @Output() preguntaCanceladaEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder,
    private toast: ToastService,
    private dataBase: DatabaseService) {
    this.todo = this.formBuilder.group({
      mensaje: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(150)]],
    });
  }

  ngOnInit() { }

  consultarAlMozo() {
    let consultaPendiente = false;
    this.dataBase.obtenerTodos('consultas').subscribe((lista: any) => {
      lista.forEach(consultaMozo => {
        let auxConsulta = consultaMozo.payload.doc.data();
        console.log(auxConsulta);
        if (auxConsulta.user.email == this.user.email && consultaMozo.estado != "respondido") {
          consultaPendiente = true;
          this.toast.presentToast("Debe esperar a que se le responda la ultima consulta antes de hacer una nueva.", 3000, "warning", "Ya Posee una consulta");
        }
      });
      if (!consultaPendiente) {
        this.mostrarAdvertencia = true;
      }
    });
  }
  EnviarConsulta() {
    let consultaGenerada = {
      mensaje: this.todo['mensaje'],
      user: this.user,
      fecha: Date.now(),
      estado: "sin leer"
    }
    this.dataBase.crear('consultas', consultaGenerada);
    this.toast.presentToast("Se ha enviado la consulta, le avisaremos cuando tenga una respuesta.", 2000, "success", "Consulta enviada");

  }
  cancelarConsulta() {
    console.log("EMITIDO");
    this.preguntaCanceladaEvent.emit();
  }
}
