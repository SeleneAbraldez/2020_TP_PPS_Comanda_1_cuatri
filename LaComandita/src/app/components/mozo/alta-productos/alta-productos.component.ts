import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
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
  todo: FormGroup;

  mostrarImgen = false;
  showSpinner: any = false;

  @Input() producto = {
    nombre: "",
    descripcion: "",
    tiempo: "",
    precio: "",
    imagen: "",
    codigoDeProducto: "",
    tipo:""
  };
  //tomarFotografia
  storageRef = this.angularFireStorage.storage.ref();
  imagen: string;
  nombreDeImagen: string;
  pathDeImagen: any;
  imagenesDelProducto = [];
  //fin TomarFotografia
  constructor(
    private barcodeScanner: BarcodeScanner,
    private toast: ToastService,
    private camera: Camera,
    private angularFireStorage: AngularFireStorage,
    private formBuilder: FormBuilder,
    private infoService: InformacionCompartidaService,
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
    this.nombreDeImagen = producto + '_' + fecha + '.jpg';
    this.pathDeImagen = this.storageRef.child(producto + '_' + fecha + '.jpg');
  }
  tomarFotografia() {
    this.storageRef=this.angularFireStorage.storage.ref(this.producto.tipo);
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.imagen = 'data:image/jpeg;base64,' + imageData;
      this.producto.imagen = this.imagen;
      this.componerNombreDeImagen(this.producto.codigoDeProducto, new Date().getTime());//le paso el usuario + fecha en milisegundos + tipo de foto

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

  agregarProducto(sector) {
    this.mostrarImgen = false;
    let auxProducto = this.producto;
    if (this.imagen) {
      auxProducto.imagen = this.nombreDeImagen;
      this.showSpinner = true;
      this.subirImagenAFireStorage();
    }
    this.dataBase.crear(sector, auxProducto);
    this.producto.imagen = '';
    this.producto.codigoDeProducto = this.generarCodigoAlfaNumerico(5);
  }

}