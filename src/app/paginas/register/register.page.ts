import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../clases/user';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { DatabaseService } from '../../services/database.service';
import { Camera, CameraOptions, DestinationType, EncodingType, PictureSourceType } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from "@angular/fire/storage";
import * as firebase from 'firebase';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  esLogin: boolean = false;
  @Input() user: User = new User();
  // @Input() tipoAlta = [
  //   "Dueño/Supervisor",
  //   "Empleados",
  //   "Productos",
  //   "Cliente",
  //   "Mesa"
  // ]
  @Input() tipoUsuarios = [
    //dueño y supervisor
    { "tipo": "Dueño", "rango": "1" },
    { "tipo": "Supervisor", "rango": "1" },
    //empleados mozo cocinero bartender cervecero delivery
    { "tipo": "Mozo", "rango": "2" },
    { "tipo": "Cocinero", "rango": "2" },
    { "tipo": "Bartender", "rango": "2" },
    { "tipo": "Cervecero", "rango": "2" },
    { "tipo": "Delivery", "rango": "2" }
  ]

  tipoAlta: string;

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router,
    private dataBase: DatabaseService,
    private camera: Camera,
    private fire: AngularFireStorage,
    private barcodeScanner: BarcodeScanner
  ) { }

  ngOnInit() {
    this.tipoAlta = "Dueño/Supervisor";
  }

  async onRegister() {
    const response = await this.authService.onRegister(this.user);
    if (response.user) {
      this.authService.currentUser = this.user;
      this.toast.presentToast("Registro exitoso", 1500, "success", "Bienvenido");
      this.router.navigateByUrl('/home');
    }
  }

  seleccionarUsuario(usuario) {
    // this.user.tipo = usuario.tipo;
  }

  sacarFoto() {
    const opciones: CameraOptions = {
      quality: 50,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    }
    this.camera.getPicture(opciones).then((ImageData) => {
      var base64Str = 'data:image/jpeg;base64,' + ImageData;
      var storageRef = firebase.storage().ref();
      var user = JSON.parse(localStorage.getItem("usuarix"));
      var tiempo = Date.now();
      var nombre = user + "_" + tiempo + "_" + ".jpg";
      var childRef = storageRef.child(nombre);
      childRef.putString(base64Str, 'data_url').then(function (snapshot) {

      });
    }, (Err) => {
      // ! hacer notificacion y que vibre
      alert(JSON.stringify(Err));
    })
  }

  escanearQR() {
    this.barcodeScanner.scan().then(barcodeData => {

    }).catch(err => {
      alert('Error' + err);
    })

  }




}
