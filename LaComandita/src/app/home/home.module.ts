import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MuestreoComponent } from 'src/app/components/principal/muestreo/muestreo.component';
import { PrecioPipe } from 'src/app/pipes/precio.pipe';
import { MenuProductosComponent } from 'src/app/components/principal/menu-productos/menu-productos.component';
import { DetalladoDelPedidoComponent } from 'src/app/components/principal/detallado-del-pedido/detallado-del-pedido.component';
import { TablaProductosPorTipoComponent } from 'src/app/components/principal/tabla-productos-por-tipo/tabla-productos-por-tipo.component';
import { StepsModule } from 'primeng/steps';
import { SingularPipe } from 'src/app/pipes/singular.pipe';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { EncuestaDeSatisfaccionComponent} from 'src/app/components/principal/encuesta-de-satisfaccion/encuesta-de-satisfaccion.component';
import {RatingModule} from 'primeng/rating';

import {AnagramaComponent} from 'src/app/components/principal/juegos/anagrama/anagrama.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StepsModule,
    HomePageRoutingModule,
    DialogModule,
    SliderModule,
    AccordionModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    RatingModule
  ],
  declarations: [HomePage,
    MuestreoComponent,
    PrecioPipe,
    SingularPipe,
    MenuProductosComponent,
    DetalladoDelPedidoComponent,
    TablaProductosPorTipoComponent,
    EncuestaDeSatisfaccionComponent,
    AnagramaComponent
    ],
  providers: [ConfirmationService]
})
export class HomePageModule { }
