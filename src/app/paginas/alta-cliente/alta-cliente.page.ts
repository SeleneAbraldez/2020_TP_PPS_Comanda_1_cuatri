import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.page.html',
  styleUrls: ['./alta-cliente.page.scss'],
})
export class AltaClientePage implements OnInit {
  esAnonimo = true;
  user = { 'perfil': 'cliente', 'imagen': '', 'tipo': 'anonimo' };

  constructor() { }

  ngOnInit() {
  }
  cambiarFormulario() {
    this.esAnonimo ? this.user.tipo = 'anonimo' : this.user.tipo = 'registrado';
    this.user.tipo == 'registrado' ? this.user['email'] = "" : null;

  }
}
