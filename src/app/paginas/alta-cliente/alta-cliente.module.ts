import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { AltaClientePageRoutingModule } from './alta-cliente-routing.module';

import { AltaClientePage } from './alta-cliente.page';
import { FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
import {FormAltaComponent} from 'src/app/components/admin/form-alta/form-alta.component';
import {FormAltaAnonimoComponent} from 'src/app/components/alta-cliente/form-alta-anonimo/form-alta-anonimo.component';
import {InputSwitchModule} from 'primeng/inputswitch';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaClientePageRoutingModule,
    ReactiveFormsModule,
    InputSwitchModule
  ],
  declarations: [AltaClientePage,FormAltaComponent,FormAltaAnonimoComponent]
})
export class AltaClientePageModule {}
