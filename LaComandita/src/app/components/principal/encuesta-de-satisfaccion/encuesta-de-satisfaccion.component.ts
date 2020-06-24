import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-encuesta-de-satisfaccion',
  templateUrl: './encuesta-de-satisfaccion.component.html',
  styleUrls: ['./encuesta-de-satisfaccion.component.scss'],
})
export class EncuestaDeSatisfaccionComponent implements OnInit {
  @Input() pedidoActual;
  experiencia: string = "";
  @Input() mostrarEncuesta: boolean = false;
  resultado: number = 0;
  puntosMozo: number = 0;
  puntosRestaurante: number = 0;
  puntosMesa: number = 0;
  puntosCocinero: number = 0;
  msg: string = "";
  @Output() dialogCerradoEvent = new EventEmitter<any>();

  val: number;
  constructor(private toast: ToastService,
    private dataBase: DatabaseService) {

  }
  cancelar() {
    this.dialogCerradoEvent.emit();
  }
  ngOnInit() { }

  handleRate(event) {
    this.resultado = this.puntosMesa + this.puntosMozo + this.puntosCocinero + this.puntosRestaurante;
    if (this.resultado <= 4) {
      this.msg = "Indignado";
    }
    else if (this.resultado > 4 && this.resultado <= 12) {
      this.msg = "Muy malo";
    }
    else if (this.resultado > 12 && this.resultado <= 25) {
      this.msg = "Regular";
    }
    else if (this.resultado > 25 && this.resultado <= 35) {
      this.msg = "Muy bueno";
    }
    else {
      this.msg = "Fascinado";
    }
  }
  enviarEncuesta() {
 
    let informacion: any;
    if (this.experiencia.length > 66) {
      this.toast.presentToast("Maximo son 66 caracteres y usted uso " + this.experiencia.length, 2000, 'warning', "Caracteres excedidos");
    }
    else {
      let totalDePuntos = this.puntosCocinero + this.puntosMesa + this.puntosMozo + this.puntosRestaurante;
      alert(this.puntosCocinero);
      alert( this.puntosMozo);
      alert(this.puntosRestaurante);
      alert(this.puntosRestaurante);
      alert( this.experiencia);
      alert(this.pedidoActual.cliente.email);
      alert(this.pedidoActual.cliente.mesa.codigo);
      alert(this.pedidoActual.codigoPedido);
      alert(totalDePuntos);
      informacion = {
        "puntosCocinero": this.puntosCocinero,
        "puntosMozo": this.puntosMozo,
        "puntosMesa": this.puntosRestaurante,
        "puntosRestaurante": this.puntosRestaurante,
        "experiencia": this.experiencia,
        "cliente": this.pedidoActual.cliente.email,
        "mesa": this.pedidoActual.cliente.mesa.codigo,
        "orden": this.pedidoActual.codigoPedido,
        "totalDePuntos": totalDePuntos
      };
      alert(JSON.stringify(informacion));
      if (informacion.totalDePuntos != 0) {
        this.dataBase.crear('encuestas', informacion).then(res => {
          this.pedidoActual.estadoEncuesta = "enviada";
          this.toast.presentToast("Gracias por su tiempo." + this.experiencia.length, 2000, 'success', "Encuesta enviada");
          this.dataBase.actualizar("pedidosMozo", this.pedidoActual.id, this.pedidoActual);
          this.mostrarEncuesta=false;
        });
      }
      else {
        this.toast.presentToast("No puede enviar una encuesta sin votos" + this.experiencia.length, 2000, 'warning', "Sin votos");
      }
    }
  }

}
