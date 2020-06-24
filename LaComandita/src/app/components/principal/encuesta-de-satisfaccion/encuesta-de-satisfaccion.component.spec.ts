import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EncuestaDeSatisfaccionComponent } from './encuesta-de-satisfaccion.component';

describe('EncuestaDeSatisfaccionComponent', () => {
  let component: EncuestaDeSatisfaccionComponent;
  let fixture: ComponentFixture<EncuestaDeSatisfaccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestaDeSatisfaccionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EncuestaDeSatisfaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
