import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../clases/user';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { Vibration } from '@ionic-native/vibration/ngx';
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
  onLogin2() {//cambiar el sistema de registro y login por usuarios sin email.
    this.dataBase.obtenerTodos('usuarios').subscribe(listaDeUsuarios => {
      listaDeUsuarios.forEach(usuario => {
        console.log(usuario);
      });
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
