import { AngularFireStorage } from '@angular/fire/storage';
import { Component, OnInit, Input } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastService } from 'src/app/services/toast.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-form-alta',
  templateUrl: './form-alta.component.html',
  styleUrls: ['./form-alta.component.scss'],
})
export class FormAltaComponent implements OnInit {
  showSpinner: any = false;
  codigoEscaneado: any;
  tipoDeForm = "";
  todo: FormGroup;
  @Input() user = {
    nombre: "",
    apellido: "",
    dni: "",
    cuil: "",
    perfil: "",
    imagen: "",
  };
  //tomarFotografia
  storageRef = this.angularFireStorage.storage.ref();
  imagen: string;
  nombreDeImagen: string;
  pathDeImagen: any;
  //fin TomarFotografia

  constructor(
    private barcodeScanner: BarcodeScanner,
    private dataBase: DatabaseService,
    private camera: Camera,
    private toast: ToastService,
    private angularFireStorage: AngularFireStorage, private formBuilder: FormBuilder) {
    this.todo = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{3,10}$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{3,10}$')]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      cuil: ['', [Validators.required, Validators.pattern('^[0-9]{2}-[0-9]{8}-[0-9]$')]],
      perfil: ['', Validators.required],
      tipo: ['', Validators.required],
    });
  }

  ngOnInit() { }
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      let auxUser = JSON.parse(barcodeData.text);
      this.user = auxUser;
      this.toast.presentToast("El QR corresponde a: " + auxUser.apellido + " " + auxUser.nombre, 2000, "success", "Leido");
    }).catch(err => {
      this.toast.presentToast("El QR no corresponde al sistema", 2000, "danger", "QR incorrecto");
    });
  }
  componerNombreDeImagen(usuario: string, fecha: number) {
    this.nombreDeImagen = usuario + '_' + fecha + '.jpg';
    this.pathDeImagen = this.storageRef.child(usuario + '_' + fecha + '.jpg');
  }
  tomarFotografia() {

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.imagen = 'data:image/jpeg;base64,' + imageData;
      this.user.imagen = this.imagen;
      this.componerNombreDeImagen(this.user.dni, new Date().getTime());//le paso el usuario + fecha en milisegundos + tipo de foto
    }, (err) => {
      this.toast.presentToast(err, 2000, 'danger', 'ERROR');
    });
  }
  subirImagenAFireStorage() {
    this.pathDeImagen.putString(this.imagen, 'data_url').then((response) => {
      this.showSpinner = false;
      this.toast.presentToast("La imagen se subio con exito", 2000, 'success', 'Imagen subida');
    });

  }

  darDeAlta() {
    let auxUser = this.user;
    auxUser.imagen = this.nombreDeImagen;
    if (this.imagen) {
      this.showSpinner = true;
      this.subirImagenAFireStorage();
    }
    this.dataBase.crear('usuarios', auxUser);
    this.user.imagen = '';
  }
}
