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
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ListaDeConsultasComponent } from 'src/app/components/mozo/lista-de-consultas/lista-de-consultas.component';
import { MilisecondsToDatePipe } from 'src/app/pipes/miliseconds-to-date.pipe';
import { FormConsultaComponent } from 'src/app/components/mozo/form-consulta/form-consulta.component';
import { AccordionModule } from 'primeng/accordion';
import { ListaDePedidosComponent } from 'src/app/components/mozo/lista-de-pedidos/lista-de-pedidos.component';
import { ListaDePedidosACobrarComponent } from 'src/app/components/mozo/lista-de-pedidos-acobrar/lista-de-pedidos-acobrar.component';
import { AccordionProductoComponent } from 'src/app/components/mozo/accordion-producto/accordion-producto.component';
import { PrecioPipe } from 'src/app/pipes/precio.pipe';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {DropdownModule} from 'primeng/dropdown';
import { TransformarTextoPipe } from 'src/app/pipes/transformar-texto.pipe';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MozoPageRoutingModule,
    SidebarModule,
    ReactiveFormsModule,
    InputTextareaModule,
    AccordionModule,
    TriStateCheckboxModule,
    DialogModule,
    DropdownModule,
    TableModule
  ],
  declarations: [MozoPage,
    SalaDeEsperaComponent,
    PrecioPipe,
    AltaProductosComponent,
    AsignarMesaComponent,
    ListaDeConsultasComponent,
    MilisecondsToDatePipe,
    ListaDePedidosACobrarComponent,
    TransformarTextoPipe,
    ListaDePedidosComponent,
    FormConsultaComponent,
    AccordionProductoComponent
  ]
})
export class MozoPageModule { }
