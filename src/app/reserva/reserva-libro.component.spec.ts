import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaLibroComponent } from './reserva-libro.component';

describe('ReservaLibroComponent', () => {
  let component: ReservaLibroComponent;
  let fixture: ComponentFixture<ReservaLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaLibroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
