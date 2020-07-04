import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminPageRoutingModule } from './admin-routing.module';
import { AdminPage } from './admin.page';
import { SidebarModule } from 'primeng/sidebar';
import { FormAltaComponent } from 'src/app/components/admin/form-alta/form-alta.component';
import {GraficosComponent } from 'src/app/components/admin/graficos/graficos.component';
import {ChartModule} from 'primeng/chart';
import {PrecioPipe} from 'src/app/pipes/precio.pipe';
import {SingularPipe} from 'src/app/pipes/singular.pipe';
import { ListaDeUsuariosAVerificarComponent} from 'src/app/components/admin/lista-de-usuarios-averificar/lista-de-usuarios-averificar.component';
let primeNgModules = [
  SidebarModule,
  ChartModule,
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    primeNgModules,
    ReactiveFormsModule,
    
  ],
  declarations: [AdminPage,
    FormAltaComponent,
    ListaDeUsuariosAVerificarComponent,
    GraficosComponent,
    PrecioPipe,
    SingularPipe
  ]
})
export class AdminPageModule { }

