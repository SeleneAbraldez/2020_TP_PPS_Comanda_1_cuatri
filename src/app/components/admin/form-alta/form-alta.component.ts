import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-form-alta',
  templateUrl: './form-alta.component.html',
  styleUrls: ['./form-alta.component.scss'],
})
export class FormAltaComponent implements OnInit {
  codigoEscaneado:any;
  tipoDeForm = "";
  camera = false;
  user: any = {
    nombre: "",
    apellido: "",
    dni: "",
    cuil: "",
    perfil: "",
    imagen: "",
    qr: ""
  };
  constructor(
    private barcodeScanner:BarcodeScanner
  ) { }

  ngOnInit() { }
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.codigoEscaneado=barcodeData;
      alert(barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }
}
