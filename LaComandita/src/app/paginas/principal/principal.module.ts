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
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

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
  ],
  declarations: [PrincipalPage,
    FormConsultasComponent
  ],
  providers: [ConfirmationService, EmailService]
})
export class PrincipalPageModule { }
