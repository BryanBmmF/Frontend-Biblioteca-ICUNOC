import { Libro } from './libro';

describe('Libro', () => {
  it('should create an instance', () => {
    expect(new Libro("Autor", "30159", 1, "2021-04-01T06:00:00.000+00:00", "INGLES", "Ecuaciones", "/gfdt54gfd", 10, 1)).toBeTruthy();
  });
});