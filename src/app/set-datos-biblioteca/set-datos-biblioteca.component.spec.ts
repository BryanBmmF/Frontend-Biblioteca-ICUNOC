import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDatosBibliotecaComponent } from './set-datos-biblioteca.component';

describe('SetDatosBibliotecaComponent', () => {
  let component: SetDatosBibliotecaComponent;
  let fixture: ComponentFixture<SetDatosBibliotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetDatosBibliotecaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetDatosBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
