import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/clases/user';
import { ToastService } from './toast.service';
import { Vibration } from '@ionic-native/vibration/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  isLogged: any = false;
  constructor(private angularFireAuth: AngularFireAuth,
    private toast: ToastService,
    private vibration:Vibration
  ) {
    this.angularFireAuth.authState.subscribe(user => (this.isLogged = user));
  }


  //LOGIN
  async onLogin(user: User) {
    try {
      return await this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      this.vibration.vibrate(300);
      console.log(error);
      switch (error.code) {
        case "auth/user-not-found":
          this.toast.presentToast("La cuenta no esta registrada", 2000, "warning", "Cuenta inexistente");
          break;
        case "auth/wrong-password":
          this.toast.presentToast("Los datos no son validos, intenta de nuevo", 2000, "warning", "Cuenta incorrecta");
          break;
        case "auth/invalid-email":
          this.toast.presentToast("Debe ser un correo electronico, intenta de nuevo", 2000, "warning", "Formato invalido");
          break;
        case "auth/network-request-failed":
          //sin conexion a internet
          this.toast.presentToast("No hay conexion a internet, revisa tu conexion y vuelve a intentarlo.", 2000, "primary", "Sin conexion");
          break;
        case "auth/too-many-requests":
          //muchos intentos incorrectos
          this.toast.presentToast("Has intentado ingresar muchas veces, vuelve a intentarlo  en 5 minutos", 2000, "danger", "Demaciados intentos");
          break;
        case "auth/argument-error":
          //argumentos invalidos
          this.toast.presentToast("Hubo un error vuelve a intentarlo", 2000, "warning", "Ups.");
          break;
      }
      return error;
    }
  }
  //REGISTER 
  async onRegister(user: User) {
    try {
      return await this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      this.vibration.vibrate(300);
      console.log(error);
      switch (error.code) {
        case "auth/weak-password":
          this.toast.presentToast("La contraseña debe tener al menos 6 caracteres", 2000, "warning", "Contraseña muy debil");
          break;
        case "auth/email-already-in-use":
          this.toast.presentToast("Ese correo ya esta en uso, escoje otra", 2000, "warning", "Cuenta existente");
          break;
        case "auth/invalid-email":
          this.toast.presentToast("Debe ser un correo electronico, intenta de nuevo", 2000, "warning", "Formato invalido");
          break;
        case "auth/network-request-failed":
          //sin conexion a internet
          this.toast.presentToast("No hay conexion a internet, revisa tu conexion y vuelve a intentarlo.", 2000, "primary", "Sin conexion");
          break;
        case "auth/argument-error":
          //argumentos invalidos
          this.toast.presentToast("Hubo un error vuelve a intentarlo", 2000, "warning", "Ups.");
          break;
      }
    }
  }
}
