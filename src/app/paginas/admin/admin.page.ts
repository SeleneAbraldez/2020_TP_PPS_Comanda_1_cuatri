import { Component, OnInit } from '@angular/core';

import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  leftMenu = false;
  rightMenu = false;
  mostrarFormRegistro = false;
  user: any = {};
  imagen: string;
  constructor(

    private toast: ToastService

  ) { }

  ngOnInit() {
  }
  toggleLeftMenu() {
    this.leftMenu ? this.leftMenu = false : this.leftMenu = true;
  }
  mostrarForm(perfil) {
    this.user = { 'perfil': perfil, 'imagen': '' };
    this.mostrarFormRegistro = true;
  }


}
