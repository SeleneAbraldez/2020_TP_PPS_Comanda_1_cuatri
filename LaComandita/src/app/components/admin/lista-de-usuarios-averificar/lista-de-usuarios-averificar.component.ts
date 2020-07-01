import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-lista-de-usuarios-averificar',
  templateUrl: './lista-de-usuarios-averificar.component.html',
  styleUrls: ['./lista-de-usuarios-averificar.component.scss'],
})
export class ListaDeUsuariosAVerificarComponent implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  @Input() lista: any;
  constructor(private dataBase: DatabaseService) { }

  ngOnInit() { }
  aceptarUsuario(usuario) {
    usuario.verificado = true;
    this.dataBase.actualizar('usuarios', usuario.id, usuario);
  }
  rechazarUsuario(usuario) {
    usuario.verificado = true;
    this.dataBase.actualizar('usuarios', usuario.id, usuario);
  }
}
