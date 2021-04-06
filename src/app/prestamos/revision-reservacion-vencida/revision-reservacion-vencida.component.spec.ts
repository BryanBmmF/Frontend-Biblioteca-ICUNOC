import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionReservacionVencidaComponent } from './revision-reservacion-vencida.component';

describe('RevisionReservacionVencidaComponent', () => {
  let component: RevisionReservacionVencidaComponent;
  let fixture: ComponentFixture<RevisionReservacionVencidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionReservacionVencidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionReservacionVencidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
