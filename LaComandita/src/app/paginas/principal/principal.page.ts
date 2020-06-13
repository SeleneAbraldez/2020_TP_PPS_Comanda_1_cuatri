import { Component, OnInit, Input } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastService } from 'src/app/services/toast.service';
import { ConfirmationService, Message } from 'primeng/api';
import { EmailService } from 'src/app/services/email.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-principal',
    templateUrl: './principal.page.html',
    styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
    mostrarFormConsultas=false;
    slideOpts = {
        initialSlide: 0,
        speed: 200,
        autoplay: true
    };
    productoSeleccionado = "comidas";
    user: any
    comidas = ["../../../assets/images/pagPrincipal/1.png",
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
    constructor(
        private barcodeScanner: BarcodeScanner,
        private toast: ToastService,
        private emailService: EmailService,
        private dataBase: DatabaseService,
        private authService: AuthService,
        private confirmationService: ConfirmationService) {
        this.user = this.authService.currentUser;
    }

    confirmarIngresoASalaDeEspera() {
        this.confirmationService.confirm({
            message: 'Esta por ingresar a la sala de espera, quiere continuar?',
            header: 'Confimacion',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: "Ir a sala de espera",
            accept: () => {
                //cambiar la ubicacion a Sala de espera
                this.user = this.authService.currentUser;

                this.user['ubicado'] = 'salaDeEspera';
                this.dataBase.actualizar('usuarios', this.user.id, this.user).then(res => {
                    this.toast.presentToast("Ya estas en cola para ser atendido", 2000, "success", "");
                }).catch(error => {
                    this.toast.presentToast("NO" + error, 2000, "danger", "sd");

                });
            }
        });
    }


    ngOnInit() {

    }
    scanCode() {
        this.barcodeScanner.scan().then(barcodeData => {
            let infoQR = JSON.parse(barcodeData.text);
            switch (infoQR.tipo) {
                case "ingreso":
                    // alert(this.authService.currentUser.ubicado);
                    if (this.authService.currentUser.ubicado == "salaDeEspera" ||
                        this.authService.currentUser.ubicado == "enMesa") {
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
                this.dataBase.obtenerById('usuarios', this.authService.currentUser.id).subscribe(res => {//actualizo 
                    this.user = res.payload.data();
                })
                // alert("ya tengo mesa")
                //boton consulta al mozo!
            }
            else {
                alert("ESTA no es tu mesa");
            }
        }
        else {
            alert("el metre te asignara una mesa.");
        }
        return retorno;
    }
    test() {

        this.emailService.sendMail("Jonathan.n.haedo@gmail.com", "Hola como esttas?", true);
    }


}
