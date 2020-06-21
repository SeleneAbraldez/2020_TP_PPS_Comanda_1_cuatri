import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CocineroPageRoutingModule } from './cocinero-routing.module';

import { CocineroPage } from './cocinero.page';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { ListaDeOrdenesComponent } from 'src/app/components/empleados/lista-de-ordenes/lista-de-ordenes.component';
import { AccordionProductoComponent } from 'src/app/components/mozo/accordion-producto/accordion-producto.component';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  imports: [
    SidebarModule,
    AccordionModule,
    TriStateCheckboxModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CocineroPageRoutingModule
  ],
  declarations: [CocineroPage,
    ListaDeOrdenesComponent,
    AccordionProductoComponent,
]
})
export class CocineroPageModule { }
