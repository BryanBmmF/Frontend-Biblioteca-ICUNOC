import { Prestamo } from './Prestamo';

describe('Prestamo', () => {
  it('should create an instance', () => {
    expect(new Prestamo("Nombre", "Apellido", "DPI", "Carnet", "Sistemas", "FechaReservacion","FechaInicio", "FechaFin", 1, "RESERVADO", "432fd", false, 10, "432FDS")).toBeTruthy();
  });
});