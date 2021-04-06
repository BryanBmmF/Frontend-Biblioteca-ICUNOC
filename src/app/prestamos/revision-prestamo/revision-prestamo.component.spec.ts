import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionPrestamoComponent } from './revision-prestamo.component';

describe('RevisionPrestamoComponent', () => {
  let component: RevisionPrestamoComponent;
  let fixture: ComponentFixture<RevisionPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionPrestamoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
