import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastService } from 'src/app/services/toast.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';
import { DatabaseService } from 'src/app/services/database.service';
@Component({
  selector: 'app-alta-productos',
  templateUrl: './alta-productos.component.html',
  styleUrls: ['./alta-productos.component.scss'],
})
export class AltaProductosComponent implements OnInit {

  @Output() cerrarFormEvent: EventEmitter<any> = new EventEmitter<any>();
  todo: FormGroup;
  contadorImg = 0;
  contadorImgSubidas = 0;
  mostrarImgen = false;
  showSpinner: any = false;
  listaImagenes = [];
  @Input() producto = {
    nombre: "",
    descripcion: "",
    tiempo: "",
    precio: "",
    imagenes: [],
    codigoDeProducto: "",
    tipo: ""
  };
  //tomarFotografia
  storageRef = this.angularFireStorage.storage.ref();
  nombreDeImagen: string;
  imagenesDelProducto = [];
  //fin TomarFotografia
  constructor(
    private barcodeScanner: BarcodeScanner,
    private toast: ToastService,
    private camera: Camera,
    private angularFireStorage: AngularFireStorage,
    private formBuilder: FormBuilder,
    private dataBase: DatabaseService
  ) {
    this.todo = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]{3,60}$')]],
      descripcion: ['', [Validators.required]],
      tiempo: ['', [Validators.required, Validators.max(60)]],
      precio: ['', [Validators.required, Validators.maxLength(7)]],
      tipo: ['', Validators.required],
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
    this.producto.codigoDeProducto = this.generarCodigoAlfaNumerico(5);

  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      //  alert(barcodeData.text);
      //this.producto=JSON.parse(barcodeData.text);
      //   this.toast.presentToast("QR de: " + this.producto.apellido + " " + this.producto.nombre, 2000, "success", "Leido");
    }).catch(err => {
      this.toast.presentToast("El QR no corresponde al sistema", 2000, "danger", "QR incorrecto");
    });
  }
  componerNombreDeImagen(producto: string, fecha: number) {
    this.nombreDeImagen = producto + '_' + this.contadorImg + '_' + fecha + '.jpg';
  }
  tomarFotografia() {
    if (this.contadorImg < 3) {
      this.storageRef = this.angularFireStorage.storage.ref(this.producto.tipo);
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((imageData) => {
        let auxImg = 'data:image/jpeg;base64,' + imageData;
        this.contadorImg++;//cuento la cantidad de fotos tomadas
        this.componerNombreDeImagen(this.producto.codigoDeProducto, new Date().getTime());//le paso el usuario + fecha en milisegundos + tipo de foto
        let pathDeImagen = this.storageRef.child(this.nombreDeImagen);//guardo la referencia para firestorage(nombre de la imagen)
        this.listaImagenes.push({ pathDeImagen: pathDeImagen, imagen: auxImg, nombreDeImagen: this.nombreDeImagen });//agrego a la lista de imagenes

        this.mostrarImgen = true;
      }, (err) => {
        this.toast.presentToast(err, 2000, 'danger', 'ERROR');
      });
    }
    else {
      this.toast.presentToast("Ya alcanzo el limite de fotos para ese producto", 2000, 'warning', 'Limite alcanzado');
    }

  }
  subirImagenesAFireStorage(sector, auxProducto) {

    let listaDePromesas = [];//lista donde guardo las promesas para subir multiples fotos a la ves
    this.listaImagenes.forEach(imagen => {//genero las tres promesas
      let uploadTask = imagen.pathDeImagen.putString(imagen.imagen, 'data_url');
      listaDePromesas.push(uploadTask);
    });

    for (let i = 0; i < listaDePromesas.length; i++) {
      listaDePromesas[i].on('state_changed', function (snapshot) {
        //podria capturar el progress y hacer una barra aca, perooo no tengo ganas! capas cuando este todo ok
      }, function (error) {
      }, function () {
        listaDePromesas[i].snapshot.ref.getDownloadURL().then(function (downloadURL) {
          auxProducto.imagenes[i]['link'] = downloadURL;
        });
      });
    }
    setTimeout(() => {
      this.showSpinner = false;
      this.dataBase.crear(sector, auxProducto);//una ves subida las 3 imagenes Creo el doc en firebase
      this.toast.presentToast("", 2000, 'success', 'Se agrego un nuevo producto en ' + sector + ' con exito');
      this.cerrarFormEvent.emit();
    }, 6000);
  }

  agregarProducto(sector) {
    this.showSpinner = true;
    let auxProducto = this.producto;
    this.listaImagenes.forEach(imagen => {
      auxProducto['imagenes'].push({ nombreDeImagen: imagen.nombreDeImagen });
    });
    this.subirImagenesAFireStorage(sector, auxProducto);
    this.reiniciarCamposElementales();
  }
  
  reiniciarCamposElementales() {
    this.producto.codigoDeProducto = this.generarCodigoAlfaNumerico(5);
    this.contadorImg = 0;
    this.listaImagenes = [];
  }
}