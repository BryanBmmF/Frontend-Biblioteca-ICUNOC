import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionReservacionComponent } from './revision-reservacion.component';

describe('RevisionReservacionComponent', () => {
  let component: RevisionReservacionComponent;
  let fixture: ComponentFixture<RevisionReservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionReservacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionReservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
