import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaDeUsuariosAVerificarComponent } from './lista-de-usuarios-averificar.component';

describe('ListaDeUsuariosAVerificarComponent', () => {
  let component: ListaDeUsuariosAVerificarComponent;
  let fixture: ComponentFixture<ListaDeUsuariosAVerificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDeUsuariosAVerificarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaDeUsuariosAVerificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
