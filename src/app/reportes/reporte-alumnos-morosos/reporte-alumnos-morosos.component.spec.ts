import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAlumnosMorososComponent } from './reporte-alumnos-morosos.component';

describe('ReportePrestamosComponent', () => {
  let component: ReporteAlumnosMorososComponent;
  let fixture: ComponentFixture<ReporteAlumnosMorososComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteAlumnosMorososComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteAlumnosMorososComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
