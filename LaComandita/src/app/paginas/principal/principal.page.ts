import { Component, OnInit, Input } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastService } from 'src/app/services/toast.service';
import { ConfirmationService, Message } from 'primeng/api';
import { EmailService } from 'src/app/services/email.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-principal',
    templateUrl: './principal.page.html',
    styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
    mostrarEncuestaDeSatisfaccion = false;
    mostrarDialogPedirFactura = false;
    pedidoActual: any;
    totalAcumulado = 0;
    mostrarFormConsultas = false;
    mostrarMenuProductos = false;
    mostrarDetallesDelPedidoActual = false;
    slideOpts = {
        initialSlide: 0,
        speed: 200,
        autoplay: true
    };
    productoSeleccionado = "comidas";
    user: any
    comidas = ["../../../assets/images/pagPrincipal/comidas/1.png",
        "../../../assets/images/pagPrincipal/comidas/2.jpg",
        "../../../assets/images/pagPrincipal/comidas/3.png",
        "../../../assets/images/pagPrincipal/comidas/4.jpg",
        "../../../assets/images/pagPrincipal/comidas/5.png",
        "../../../assets/images/pagPrincipal/comidas/6.png"];

    bebidas = ["../../../assets/images/pagPrincipal/bebidas/1.png",
        "../../../assets/images/pagPrincipal/bebidas/2.png",
        "../../../assets/images/pagPrincipal/bebidas/3.png",
        "../../../assets/images/pagPrincipal/bebidas/4.png",
        "../../../assets/images/pagPrincipal/bebidas/5.png",
        "../../../assets/images/pagPrincipal/bebidas/6.png"];

    postres = ["../../../assets/images/pagPrincipal/postres/1.jpg",
        "../../../assets/images/pagPrincipal/postres/2.jpg",
        "../../../assets/images/pagPrincipal/postres/3.jpg",
        "../../../assets/images/pagPrincipal/postres/4.jpg",
        "../../../assets/images/pagPrincipal/postres/5.jpg",
        "../../../assets/images/pagPrincipal/postres/6.jpg"];
    msgs: Message[] = [];

    anonimos$: Observable<any[]>;
    listaAnonimos = [];
    actualizarUsuario() {
        this.dataBase.obtenerById('usuarios', this.authService.currentUser.id).subscribe(res => {//actualizo 
            this.user = res.payload.data();
            if (this.user.idPedidoMozo) {
                this.dataBase.obtenerById('pedidosMozo', this.user.idPedidoMozo).subscribe(res => {
                    if (res.payload.data()['estado'] != 'cerrado') {
                        this.pedidoActual = res.payload.data();
                    }
                });
            }
        });
    }
    constructor(
        private barcodeScanner: BarcodeScanner,
        private toast: ToastService,
        private emailService: EmailService,
        private dataBase: DatabaseService,
        private authService: AuthService,
        private infoService: InformacionCompartidaService,
        private confirmationService: ConfirmationService) {
        this.user = this.authService.currentUser;
    }

    ngOnInit() {
        this.anonimos$ = this.infoService.obtenerConsultas$();
        this.anonimos$.subscribe(anonimos => this.listaAnonimos = anonimos);
        this.infoService.actualizarListaUsuariosAnonimos();

        let user = this.authService.currentUser;
        if (user.idPedidoMozo) {
            this.dataBase.obtenerById('pedidosMozo', user.idPedidoMozo).subscribe(res => {
                if (res.payload.data()['estado'] != 'cerrado') {
                    this.pedidoActual = res.payload.data();
                }
            });
        }

    }
    mostrarConfirmacion() {
        this.mostrarDialogPedirFactura = true;
    }
    generarCodigoAlfaNumerico(longitud) {
        let patron = 'abcdefghijkmlnopqrstuvwxyz0123456789';
        let codigo = "";
        for (let i = 0; i < longitud; i++) {
            codigo += patron[Math.floor(Math.random() * (patron.length - 0)) + 0];
        }
        return codigo;
    }
    confirmarRecepcionDelPedido() {
        this.pedidoActual.estado = "recibido";
        this.dataBase.actualizar('pedidosMozo', this.pedidoActual.id, this.pedidoActual);
    }
    darDeAltaPedido(pedido) {
        pedido["codigoPedido"] = this.generarCodigoAlfaNumerico(5);
        pedido["cliente"] = this.authService.currentUser;
        pedido["estado"] = "enviado"
        pedido["facturacion"] = this.totalAcumulado;
        this.dataBase.crear('pedidosMozo', pedido);
        this.toast.presentToast("Solo falta que el mozo acepte su orden.", 2000, "success", "Pedido realizado");
        this.mostrarMenuProductos = false;
    }

    pedirFactura() {
        this.mostrarEncuestaDeSatisfaccion = true;
        this.pedidoActual.estado = "pidiendo factura";
        this.dataBase.actualizar('pedidosMozo', this.pedidoActual.id, this.pedidoActual);
    }
    confirmarIngresoASalaDeEspera() {
        this.confirmationService.confirm({
            message: 'Esta por ingresar a la sala de espera, quiere continuar?',
            header: 'Confimacion',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: "Ir a sala de espera",
            accept: () => {
                //cambiar la ubicacion a Sala de espera
                let imagen = this.user.imagen;
                this.user = this.authService.currentUser;


                this.user['ubicado'] = 'salaDeEspera';
                this.user['imagen'] = imagen;
                this.dataBase.actualizar('usuarios', this.user.id, this.user).then(res => {
                    this.toast.presentToast("Ya estas en cola para ser atendido", 2000, "success", "");
                }).catch(error => {
                    this.toast.presentToast("NO" + error, 2000, "danger", "sd");

                });
            }
        });
    }


    scanCode() {
        this.actualizarUsuario();

        this.barcodeScanner.scan().then(barcodeData => {
            let infoQR = JSON.parse(barcodeData.text);
            switch (infoQR.tipo) {
                case "ingreso":
                    if (this.user.ubicado == "salaDeEspera" ||
                        this.user.ubicado == "enMesa") {
                        this.toast.presentToast("No puedes volver a ponerte en cola", 2000, "warning", "Operacion repetida");
                    }
                    else {
                        this.confirmarIngresoASalaDeEspera();
                    }
                    break;
                case "mesa":
                    this.verificarSiTieneMesa(infoQR);
                    break;
            }
        }).catch(err => {
            this.toast.presentToast("El QR no corresponde al sistema", 2000, "danger", "QR incorrecto");
        });
    }

    verificarSiTieneMesa(infoQR) {
        let retorno = false;
        if (this.authService.currentUser.mesa) {
            if (this.authService.currentUser.mesa.codigo == infoQR.value) {
                this.actualizarUsuario();
            }
            else {
                this.toast.presentToast("Esta mesa no corresponde a la mesa que le asignaron.", 2000, "danger", "Mesa incorrecta");
            }
        }
        else {
            this.toast.presentToast("Espere a que el metre le asigne una mesa.", 2000, "warning", "Aun no tiene mesa");
        }
        return retorno;
    }

    test() {

        this.emailService.sendMail("Jonathan.n.haedo@gmail.com", "Hola como esttas?", true);
    }



    calcularCostoTotal(pedido) {
        this.totalAcumulado = 0;
        pedido.platos.forEach(plato => {
            this.totalAcumulado += plato.cantidad * plato.producto.precio;
        });
        pedido.postres.forEach(postre => {
            this.totalAcumulado += postre.cantidad * postre.producto.precio;
        });
        pedido.bebidas.forEach(bebida => {
            this.totalAcumulado += bebida.cantidad * bebida.producto.precio;
        });
    }
}
