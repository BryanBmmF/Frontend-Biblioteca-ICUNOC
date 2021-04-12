import { InfoBiblioteca } from './InfoBiblioteca';

describe('InfoBiblioteca', () => {
  it('should create an instance', () => {
    expect(new InfoBiblioteca("correo", "direccion", "telefono", "horario",7,5,5)).toBeTruthy();
  });
});