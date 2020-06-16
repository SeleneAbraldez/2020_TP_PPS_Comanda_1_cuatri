import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MuestreoComponent } from 'src/app/components/principal/muestreo/muestreo.component';
import { PrecioPipe } from 'src/app/pipes/precio.pipe';
import { MenuProductosComponent } from 'src/app/components/principal/menu-productos/menu-productos.component';
import { StepsModule } from 'primeng/steps';
import { SingularPipe } from 'src/app/pipes/singular.pipe';
import {DialogModule} from 'primeng/dialog';
import {SliderModule} from 'primeng/slider';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StepsModule,
    HomePageRoutingModule,
    DialogModule,
    SliderModule
  ],
  declarations: [HomePage,
    MuestreoComponent,
    PrecioPipe,
    SingularPipe,
    MenuProductosComponent]
})
export class HomePageModule { }
