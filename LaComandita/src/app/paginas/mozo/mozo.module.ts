import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MozoPageRoutingModule } from './mozo-routing.module';
import { SidebarModule } from 'primeng/sidebar';
import { MozoPage } from './mozo.page';
import { SalaDeEsperaComponent } from 'src/app/components/mozo/sala-de-espera/sala-de-espera.component';
import { AltaProductosComponent } from 'src/app/components/mozo/alta-productos/alta-productos.component';
import { AsignarMesaComponent } from 'src/app/components/mozo/asignar-mesa/asignar-mesa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TableModule} from 'primeng/table';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MozoPageRoutingModule,
    SidebarModule,
    ReactiveFormsModule,
    InputTextareaModule,
    TableModule
  ],
  declarations: [MozoPage,
    SalaDeEsperaComponent,
    AltaProductosComponent,
    AsignarMesaComponent
  ]
})
export class MozoPageModule { }
