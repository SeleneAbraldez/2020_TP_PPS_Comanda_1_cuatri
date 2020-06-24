import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BartenderPageRoutingModule } from './bartender-routing.module';

import { BartenderPage } from './bartender.page';

import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { AccordionProductoComponent } from 'src/app/components/bartender/accordion-producto/accordion-producto.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SidebarModule,
    AccordionModule,
    TriStateCheckboxModule,
    BartenderPageRoutingModule
  ],
  declarations: [BartenderPage,AccordionProductoComponent]
})
export class BartenderPageModule { }
