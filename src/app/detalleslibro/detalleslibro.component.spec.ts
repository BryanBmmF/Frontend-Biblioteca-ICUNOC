import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleslibroComponent } from './detalleslibro.component';

describe('DetalleslibroComponent', () => {
  let component: DetalleslibroComponent;
  let fixture: ComponentFixture<DetalleslibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleslibroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleslibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
