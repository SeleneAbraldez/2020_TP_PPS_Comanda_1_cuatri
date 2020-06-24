import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TablaPedidoActualPorTipoComponent } from './tabla-pedido-actual-por-tipo.component';

describe('TablaPedidoActualPorTipoComponent', () => {
  let component: TablaPedidoActualPorTipoComponent;
  let fixture: ComponentFixture<TablaPedidoActualPorTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaPedidoActualPorTipoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TablaPedidoActualPorTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
