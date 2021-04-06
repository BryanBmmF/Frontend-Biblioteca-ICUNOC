import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudResetPasswordComponent } from './solicitud-reset-password.component';

describe('SolicitudResetPasswordComponent', () => {
  let component: SolicitudResetPasswordComponent;
  let fixture: ComponentFixture<SolicitudResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudResetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
