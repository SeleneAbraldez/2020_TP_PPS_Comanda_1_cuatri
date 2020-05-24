import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../clases/user';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  esLogin: boolean = false;
  @Input() user: User = new User();
  // @Input() tipoAlta = [
  //   "Dueño/Supervisor",
  //   "Empleados",
  //   "Productos",
  //   "Cliente",
  //   "Mesa"
  // ]
  @Input() tipoUsuarios = [
    //dueño y supervisor
    { "tipo": "Dueño", "rango": "1"},
    { "tipo": "Supervisor", "rango": "1"},
    //empleados mozo cocinero bartender cervecero delivery
    { "tipo": "Mozo", "rango": "2"},
    { "tipo": "Cocinero", "rango": "2"},
    { "tipo": "Bartender", "rango": "2"},
    { "tipo": "Cervecero", "rango": "2"},
    { "tipo": "Delivery", "rango": "2"}
  ]

  tipoAlta: string;

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router,
    private dataBase: DatabaseService, ) { }

  ngOnInit() {
    this.tipoAlta = "Dueño/Supervisor";
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
