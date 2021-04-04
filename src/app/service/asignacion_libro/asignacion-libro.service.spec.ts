import { TestBed } from '@angular/core/testing';

import { AsignacionLibroService } from './asignacion-libro.service';

describe('AsignacionLibroService', () => {
  let service: AsignacionLibroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignacionLibroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
