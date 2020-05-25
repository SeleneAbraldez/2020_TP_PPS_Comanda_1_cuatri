import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { CheckboxModule } from 'primeng/checkbox';
import { SidebarModule } from 'primeng/sidebar';
import { FormAltaComponent } from 'src/app/components/admin/form-alta/form-alta.component';

let primeNgModules = [
  CheckboxModule,
  SidebarModule
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    primeNgModules
  ],
  declarations: [AdminPage,
    FormAltaComponent
  ]
})
export class AdminPageModule { }
