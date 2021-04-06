import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoLibroComponent } from './ingresoLibro.component';

describe('IngresoLibroComponent', () => {
  let component: IngresoLibroComponent;
  let fixture: ComponentFixture<IngresoLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoLibroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
