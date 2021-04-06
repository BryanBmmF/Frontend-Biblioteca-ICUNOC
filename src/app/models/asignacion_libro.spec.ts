import { AsignacionLibro } from './asignacion_libro';

describe('Categoria', () => {
  it('should create an instance', () => {
    expect(new AsignacionLibro(1,2,3)).toBeTruthy();
  });
});
