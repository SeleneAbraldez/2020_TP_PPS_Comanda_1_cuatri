import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CocineroPageRoutingModule } from './cocinero-routing.module';

import { CocineroPage } from './cocinero.page';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { AccordionProductoComponent} from 'src/app/components/cocinero/accordion-producto/accordion-producto.component';
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
    AccordionProductoComponent,
  ]
})
export class CocineroPageModule { }
