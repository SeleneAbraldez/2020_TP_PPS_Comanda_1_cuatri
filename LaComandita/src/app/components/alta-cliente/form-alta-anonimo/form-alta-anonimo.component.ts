import { AngularFireStorage } from '@angular/fire/storage';
import { Component, OnInit, Input } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form-alta-anonimo',
  templateUrl: './form-alta-anonimo.component.html',
  styleUrls: ['./form-alta-anonimo.component.scss'],
})
export class FormAltaAnonimoComponent implements OnInit {

  showSpinner: any = false;
  todo: FormGroup;
  @Input() user = {
    nombre: "",
    apellido: "",
    dni: "",
    cuil: "",
    perfil: "",
    imagen: "",
    email: ""
  };
  //tomarFotografia
  storageRef = this.angularFireStorage.storage.ref('anonimos');
  imagen: string;
  nombreDeImagen: string;
  pathDeImagen: any;
  //fin TomarFotografia

  constructor(
    private dataBase: DatabaseService,
    private camera: Camera,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
    private infoService: InformacionCompartidaService,
    private angularFireStorage: AngularFireStorage, private formBuilder: FormBuilder) {
    this.todo = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]{3,20}$')]],
      perfil: ['', Validators.required],
    });
  }

  generarCodigoAlfaNumerico(longitud) {
    let patron = 'abcdefghijkmlnopqrstuvwxyz0123456789';
    let codigo = "";
    for (let i = 0; i < longitud; i++) {
      codigo += patron[Math.floor(Math.random() * (patron.length - 0)) + 0];
    }
    return codigo;
  }
  ngOnInit() {
    this.user.email = this.generarCodigoAlfaNumerico(5) + "@gmail.com";
    this.infoService.actualizarListaDeUsuariosAnonimos();
    console.log(this.user.email);
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
  //ver como separo las imagenes en firestorage para no tener una sola lista sino se hace mas lento
  darDeAlta() {
    let auxUser = this.user;
    auxUser.imagen = this.nombreDeImagen;
    auxUser['ubicado'] = 'salaDeEspera';
    this.showSpinner = true;
    // alert(this.user.email);
    // alert(this.user.nombre);
    // alert(this.user.imagen);
    this.subirImagenAFireStorage();
    this.dataBase.crear('anonimos', auxUser);
    this.authService.currentUser = auxUser;
    this.user.imagen = '';
    this.router.navigateByUrl('/home');
  }
}


