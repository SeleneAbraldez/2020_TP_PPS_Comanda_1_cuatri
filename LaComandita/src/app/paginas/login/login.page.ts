import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../clases/user';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  esLogin: boolean = false;
  @Input() user: User = new User();
  @Input() listaUsuarios = [
    { "email": "supervisor@gmail.com", "password": "supervisor" },
    { "email": "mozo@gmail.com", "password": "mozomozo" },
    { "email": "cocinero@gmail.com", "password": "cocinero" },
    { "email": "bartender@gmail.com", "password": "bartender" },
    { "email": "cliente@gmail.com", "password": "cliente" },
    { "email": "admin@gmail.com", "password": "adminadmin" },
  ]


  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router,
    private dataBase: DatabaseService, ) { }

  ngOnInit() {
  }
  redirigirPorTipoDeEmpleado(tipoDeEmpleado) {
    switch (tipoDeEmpleado) {
      case "mozo":
        this.router.navigateByUrl('/mozo');
        break;
      case "cocinero":
        this.router.navigateByUrl('/cocinero');
        break;
      case "bartender":
        this.router.navigateByUrl('/bartender');
        break;
    }
  }
  redirigirUsuario() {
    switch (this.authService.currentUser.perfil) {
      case "empleado":
        this.redirigirPorTipoDeEmpleado(this.authService.currentUser.tipo);
        break;
      case "cliente"://ingresar a sala de espera
        this.router.navigateByUrl('/principal');
        break;
      case "supervisor":
      case "admin":
        this.router.navigateByUrl('/admin');
        break;
    }
  }

  onLogin2() {//cambiar el sistema de registro y login por usuarios sin email.
    let existe = false;
    this.dataBase.obtenerTodos('usuarios').subscribe(listaDeUsuarios => {
      listaDeUsuarios.forEach((response: any) => {
        let usuario = response.payload.doc.data();
        if (usuario.email == this.user.email && usuario.password == this.user.password) {
          console.log(usuario);
          this.authService.currentUser = usuario;
          existe = true;
          this.toast.presentToast("", 1500, "success", "Bienvenido");
          this.redirigirUsuario();
        }
      });
      if (!existe) {
        this.toast.presentToast("", 1500, "danger", "Usuario incorrecto");
      }
    });
  }

  async onLogin() {
    const response = await this.authService.onLogin(this.user);
    if (response.user) {
      this.authService.currentUser = this.user;
      this.toast.presentToast("", 1500, "success", "Bienvenido");
      this.router.navigateByUrl('/home');
    }
  }


  seleccionarUsuario(usuario) {
    this.user.email = usuario.email;
    this.user.password = usuario.password;
  }


}
