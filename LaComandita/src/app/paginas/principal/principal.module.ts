import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PrincipalPageRoutingModule } from './principal-routing.module';
import { SidebarModule } from 'primeng/sidebar';
import { PrincipalPage } from './principal.page';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EmailService } from 'src/app/services/email.service';
import { ConfirmationService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormConsultasComponent } from 'src/app/components/principal/form-consultas/form-consultas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrecioPipe } from 'src/app/pipes/precio.pipe';
import { SingularPipe } from 'src/app/pipes/singular.pipe';
import { MuestreoComponent } from 'src/app/components/principal/muestreo/muestreo.component';
import { MenuProductosComponent } from 'src/app/components/principal/menu-productos/menu-productos.component';
import { DetalladoDelPedidoComponent } from 'src/app/components/principal/detallado-del-pedido/detallado-del-pedido.component';
import { TablaProductosPorTipoComponent } from 'src/app/components/principal/tabla-productos-por-tipo/tabla-productos-por-tipo.component';
import { StepsModule } from 'primeng/steps';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { AccordionModule } from 'primeng/accordion';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenubarModule,
    SidebarModule,
    ToolbarModule,
    ConfirmDialogModule,
    PrincipalPageRoutingModule,
    InputTextareaModule,
    ReactiveFormsModule,
    StepsModule,
    DialogModule,
    SliderModule,
    AccordionModule,
  ],
  declarations: [PrincipalPage,
    FormConsultasComponent,
    MuestreoComponent,
    MenuProductosComponent,
    DetalladoDelPedidoComponent,
    TablaProductosPorTipoComponent,
    PrecioPipe,
    SingularPipe
  ],
  providers: [ConfirmationService, EmailService]
})
export class PrincipalPageModule { }
