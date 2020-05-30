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

let primeNgModules = [
  SidebarModule,
  ChartModule
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
    GraficosComponent
  ]
})
export class AdminPageModule { }

