import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { InformacionCompartidaService } from 'src/app/services/informacion-compartida.service';

@Component({
  selector: 'app-sala-de-espera',
  templateUrl: './sala-de-espera.component.html',
  styleUrls: ['./sala-de-espera.component.scss'],
})
export class SalaDeEsperaComponent implements OnInit {
  @Input() lista = [];
  @Input() spinner = true;

  constructor(private dataBase: DatabaseService,
    private infoService: InformacionCompartidaService,
    private fireStore: FirestorageService
  ) { }

  ngOnInit() { }
  AceptarIngreso(usuario) {
    console.log(usuario);
    usuario.ubicado = 'adentro'
    this.dataBase.actualizar('anonimos', usuario.id, usuario);
    setTimeout(() => {
      
      this.infoService.actualizarListaDeUsuariosEnEspera();
      this.fireStore.obtenerListaDeImagenesUsuariosEnEspera();
      this.lista=this.infoService.listaClienteEnEspera;
    }, 200);
  }
}
