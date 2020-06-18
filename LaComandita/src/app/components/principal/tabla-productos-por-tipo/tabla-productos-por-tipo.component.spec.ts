import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TablaProductosPorTipoComponent } from './tabla-productos-por-tipo.component';

describe('TablaProductosPorTipoComponent', () => {
  let component: TablaProductosPorTipoComponent;
  let fixture: ComponentFixture<TablaProductosPorTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaProductosPorTipoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TablaProductosPorTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
