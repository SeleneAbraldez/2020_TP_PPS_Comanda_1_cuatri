import { AngularFireStorage } from '@angular/fire/storage';
import { Component, OnInit, Input } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-alta-anonimo',
  templateUrl: './form-alta-anonimo.component.html',
  styleUrls: ['./form-alta-anonimo.component.scss'],
})
export class FormAltaAnonimoComponent implements OnInit {
  linkImagen = "";
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
  storageRef = this.angularFireStorage.storage.ref();
  imagen: string;
  nombreDeImagen: string;
  pathDeImagen: any;
  //fin TomarFotografia
  anonimos$: Observable<any[]>;
  listaAnonimos = [];

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

  ngOnInit() {
    this.anonimos$ = this.infoService.obtenerUsuariosAnonimos$();
    this.anonimos$.subscribe(anonimos => this.listaAnonimos = anonimos);
    this.infoService.actualizarListaUsuariosAnonimos();

    this.user.email = this.generarCodigoAlfaNumerico(5) + "@gmail.com";
    // this.infoService.actualizarListaDeUsuariosAnonimos();
    console.log(this.user.email);
  }

  generarCodigoAlfaNumerico(longitud) {
    let patron = 'abcdefghijkmlnopqrstuvwxyz0123456789';
    let codigo = "";
    for (let i = 0; i < longitud; i++) {
      codigo += patron[Math.floor(Math.random() * (patron.length - 0)) + 0];
    }
    return codigo;
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
  subirImagenAFireStorage2() {
    this.pathDeImagen.putString(this.imagen, 'data_url').then((response) => {
      this.showSpinner = false;
      this.toast.presentToast("El usuario fue creado con exito", 2000, 'success', 'Usuario creado');
    });

  }
  subirImagenAFireStorage(auxUser) {
    let algo;
    let uploadTask = this.pathDeImagen.putString(this.imagen, 'data_url');
    uploadTask.on('state_changed', function (snapshot) {
    }, function (error) {
    }, function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        auxUser['link'] = downloadURL;
      });
    });

    setTimeout(() => {
      this.showSpinner = true;
      this.dataBase.crear('usuarios', auxUser).then(res => {
        this.showSpinner = false;
        auxUser['id'] = res.id;
        this.router.navigateByUrl('/principal');
        this.authService.currentUser = auxUser;
        this.toast.presentToast("El usuario fue creado con exito", 2000, 'success', 'Usuario creado');
        this.user.imagen = '';
      });
    }, 5000);
  }

  darDeAlta() {
    this.showSpinner = true;
    let auxUser = this.user;
    auxUser.imagen = this.nombreDeImagen;
    auxUser['ubicado'] = '';
    // this.subirImagenAFireStorage();
    this.subirImagenAFireStorage(auxUser);



  }
}


