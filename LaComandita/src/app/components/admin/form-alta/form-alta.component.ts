import { AngularFireStorage } from '@angular/fire/storage';
import { Component, OnInit, Input } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { ToastService } from 'src/app/services/toast.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-alta',
  templateUrl: './form-alta.component.html',
  styleUrls: ['./form-alta.component.scss'],
})
export class FormAltaComponent implements OnInit {
  mostrarImgen = false;
  private optionsQrScanner: BarcodeScannerOptions = {
    formats: "PDF_417,QR_CODE"
  };
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
    password: "",
    email: "",
    estado: "registrado"
  };
  //tomarFotografia
  storageRef = this.angularFireStorage.storage.ref();
  imagen: string;
  nombreDeImagen: string;
  pathDeImagen: any;
  //fin TomarFotografia

  constructor(
    private router:Router,
    private barcodeScanner: BarcodeScanner,
    private dataBase: DatabaseService,
    private camera: Camera,
    private authService: AuthService,
    private toast: ToastService,
    private infoService: InformacionCompartidaService,
    private angularFireStorage: AngularFireStorage, private formBuilder: FormBuilder) {
    this.todo = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]{3,20}$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{3,10}$')]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{3,30}$')]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z-._]{3,30}@[a-zA-Z.]{3,15}\.[a-zA-Z]{3,4}$')]],
      cuil: ['', [Validators.required, Validators.pattern('^[0-9]{2}-[0-9]{8}-[0-9]$')]],
      perfil: ['', Validators.required],
      tipo: ['', Validators.required],
    });
  }

  ngOnInit() { }
  scanCode() {
    this.barcodeScanner.scan(this.optionsQrScanner).then(barcodeData => {
      let datosDelDni = barcodeData.text.split('@');
      this.user.nombre = datosDelDni[2];
      this.user.apellido = datosDelDni[1];
      this.user.dni = datosDelDni[4];
      this.user.email = this.user.apellido.toLocaleLowerCase() + "@gmail.com";
      this.user.cuil = "20-" + this.user.dni + "-" + Math.floor(Math.random() * (9 - 0)) + 0;
      //  this.user=JSON.parse(barcodeData.text);
      this.toast.presentToast("QR de: " + this.user.apellido + " " + this.user.nombre, 2000, "success", "Leido");
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
      this.componerNombreDeImagen(this.user.email, new Date().getTime());//le paso el usuario + fecha en milisegundos + tipo de foto

      this.mostrarImgen = true;
    }, (err) => {
      this.toast.presentToast(err, 2000, 'danger', 'ERROR');
    });
  }
  subirImagenAFireStorage() {
    this.pathDeImagen.putString(this.imagen, 'data_url').then((response) => {
      this.showSpinner = false;
      this.toast.presentToast("El usuario fue creado con exito", 2000, 'success', 'Usuario creado');
    });

  }
  verificarExistenciaDeUsuario() {
    let retorno = false;
    this.infoService.listaDeUsuarios.forEach(usuario => {
      if (usuario.dni == this.user.dni) {
        this.toast.presentToast("Un usuario ya fue creado con ese DNI", 2000, 'danger', 'Usuario existente');
        retorno = true;
      }
      else if (usuario.email == this.user.email) {
        this.toast.presentToast("Un usuario ya fue creado con ese Correo", 2000, 'danger', 'Usuario existente');
        retorno = true;
      }
    });
    return retorno;

  }
  async darDeAlta() {
    this.mostrarImgen = false;
    this.infoService.actualizarListaDeUsuarios();
    const response = await this.authService.onRegister(this.user);
    if (response) {
      response.user.sendEmailVerification();
      if (!this.verificarExistenciaDeUsuario()) {
        let auxUser = this.user;
        if (this.imagen) {
          auxUser.imagen = this.nombreDeImagen;
          this.showSpinner = true;
          this.subirImagenAFireStorage();
        }
        auxUser['verificado'] = false;
        this.dataBase.crear('usuarios', auxUser);
        this.user.imagen = '';
        this.router.navigateByUrl('/login');
      }
    }
  }
}
