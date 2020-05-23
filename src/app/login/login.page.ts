import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../clases/user';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Input() user: User = new User();
  @Input() listaUsuarios = [
    { "email": "mozo@gmail.com", "password": "mozomozo" },
    { "email": "admin@gmail.com", "password": "adminadmin" },
    { "email": "bartender@gmail.com", "password": "bartender" },
    { "email": "cocinero@gmail.com", "password": "cocinero" },
    { "email": "usuario@gmail.com", "password": "usuario" }]


  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router) { }

  ngOnInit() {
  }

  async onLogin() {
    const response = await this.authService.onLogin(this.user);
    if (response.user) {
      this.authService.currentUser = this.user;
      this.toast.presentToast("", 1500, "success", "Bienvenido");
      this.router.navigateByUrl('/home');
    }
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
    this.user.email = usuario.email;
    this.user.password = usuario.password;
  }


}
