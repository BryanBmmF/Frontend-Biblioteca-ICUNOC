import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionBitacoraComponent } from './revision-bitacora.component';

describe('RevisionBitacoraComponent', () => {
  let component: RevisionBitacoraComponent;
  let fixture: ComponentFixture<RevisionBitacoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionBitacoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionBitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
