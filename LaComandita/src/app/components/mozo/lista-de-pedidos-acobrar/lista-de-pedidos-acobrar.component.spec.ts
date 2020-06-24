import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaDePedidosACobrarComponent } from './lista-de-pedidos-acobrar.component';

describe('ListaDePedidosACobrarComponent', () => {
  let component: ListaDePedidosACobrarComponent;
  let fixture: ComponentFixture<ListaDePedidosACobrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDePedidosACobrarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaDePedidosACobrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
