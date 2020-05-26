import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-form-alta',
  templateUrl: './form-alta.component.html',
  styleUrls: ['./form-alta.component.scss'],
})
export class FormAltaComponent implements OnInit {
  codigoEscaneado: any;
  tipoDeForm = "";
  camera = false;
  user: any = {
    nombre: "",
    apellido: "",
    dni: "",
    cuil: "",
    perfil: "",
    imagen: "",
  };
  constructor(
    private barcodeScanner: BarcodeScanner,
    private toast: ToastService
  ) { }

  ngOnInit() { }
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      let auxUser = JSON.parse(barcodeData.text);
      this.user=auxUser;
      this.toast.presentToast("El QR corresponde a: "+auxUser.apellido+" "+auxUser.nombre, 3000, "success", "Leido");
    }).catch(err => {
      this.toast.presentToast("El QR no corresponde al sistema", 2000, "danger", "QR incorrecto");
    });
  }
}
