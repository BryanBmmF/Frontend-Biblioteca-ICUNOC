import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarDevolucionComponent } from './registrar-devolucion.component';

describe('RegistrarDevolucionComponent', () => {
  let component: RegistrarDevolucionComponent;
  let fixture: ComponentFixture<RegistrarDevolucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarDevolucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
