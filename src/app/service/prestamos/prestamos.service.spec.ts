import { TestBed } from '@angular/core/testing';
import { PrestamosService } from './prestamos.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import prestamos from '../../test/fileTest/prestamos.json';
import prestamo from '../../test/fileTest/prestamo.json';
import { Prestamo } from 'src/app/models/Prestamo';

describe('PrestamosService', () => {
  //el servicio que utiliza el test
  let service: PrestamosService;

  //los mocks
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      //los imports y los providers necesarios
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{
        provide: Router,
        useValue: mockRouter,
      },
        PrestamosService,
        CookieService]
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    service = new PrestamosService(httpClient);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  it('detail', () => {
    //Arrage
    let idPrestamo: string;
    idPrestamo = "1";

    //Act
    service.detail(idPrestamo).subscribe((result: Prestamo) => {
      expect(result.carnet).toBe("201631722");
    });

    //expect
    const request = httpMock.expectOne(`${service.prestamosURL + idPrestamo}`);
    expect(request.request.method).toBe('GET');
    request.flush(prestamo);
  });

  it('save', () => {
    //Arrage
    //const userMock = new User("user1","201730159","user1","password1","Administrador","correo");

    //Act
    service.save(prestamo).subscribe((result: Prestamo) => {
      expect(result.carnet).toBe("201631722");
    });

    //expect
    const request = httpMock.expectOne(`${service.prestamosURL + "crearReservacion"}`, prestamo);
    expect(request.request.method).toBe('POST');
    request.flush(prestamo);
  });

  it('listaxEstado', () => {
    //Arrage
    let estado: string;
    estado = "ACTIVO";

    //Act
    service.listaxEstado(estado).subscribe((result: Prestamo[]) => {
      //se esperan dos valores en la lista
      expect(result.length).toBe(2);
    });
    const request = httpMock.expectOne(`${service.prestamosURL + "listaPrestamo/" + estado}`);
    expect(request.request.method).toBe('GET');
    request.flush(prestamos);
  });

  it('finalizarPrestamo', () => {
    //Arrage
    let codigoReservacion: string = "IQ486HO1";
    //Act
    service.finalizarPrestamo(codigoReservacion, prestamo).subscribe((result: Prestamo) => {
      expect(result.carnet).toBe("201631722");
    });

    //expect
    const request = httpMock.expectOne(`${service.prestamosURL + "finalizar/"+codigoReservacion}`, prestamo);
    expect(request.request.method).toBe('PUT');
    request.flush(prestamo);
  });

  it('cancelarReservacion', () => {
    //Arrage
    let codigoReservacion: string = "IQ486HO1";
    //Act
    service.cancelarReservacion(codigoReservacion, prestamo).subscribe((result: Prestamo) => {
      expect(result.carnet).toBe("201631722");
    });

    //expect
    const request = httpMock.expectOne(`${service.prestamosURL + "cancelar/"+codigoReservacion}`, prestamo);
    expect(request.request.method).toBe('PUT');
    request.flush(prestamo);
  });

  it('iniciarPrestamo', () => {
    //Arrage
    let codigoReservacion: string = "IQ486HO1";
    //Act
    service.iniciarPrestamo(codigoReservacion, prestamo).subscribe((result: Prestamo) => {
      expect(result.carnet).toBe("201631722");
    });

    //expect
    const request = httpMock.expectOne(`${service.prestamosURL + "iniciar/"+codigoReservacion}`, prestamo);
    expect(request.request.method).toBe('PUT');
    request.flush(prestamo);
  });

  it('eliminarReservacion', () => {
    //Arrage
    let idPrestamo: string;
    idPrestamo = "1";
    
    //Act
    service.eliminarReservacion(idPrestamo).subscribe((result: Prestamo) => {
      expect(result.carnet).toBe("201631722");
    });

    //expect
    const request = httpMock.expectOne(`${service.prestamosURL + "eliminar/" + idPrestamo}`);
    expect(request.request.method).toBe('DELETE');
    request.flush(prestamo);
  });

  it('consultarPrestamosReservacionesActivas', () => {
    //Arrage
    let dpi: string;
    let carnet: string;
    dpi = "2222222222222";
    carnet = "201631722";

    //Act
    service.consultarPrestamosReservacionesActivas(dpi,carnet).subscribe((result: number) => {
      //se esperan dos valores en la lista
      expect(result).toBe(2);
    });
    const request = httpMock.expectOne(`${service.prestamosURL + "verificacion/" + dpi+"/"+carnet}`);
    expect(request.request.method).toBe('GET');
    request.flush(2);
  });

  it('busquedaFiltrada', () => {
    //Arrage
    let strBusqueda: string;
    strBusqueda = "6";
    let estado: string;
    strBusqueda = "ACTIVO";

    //Act
    service.busquedaFiltrada(strBusqueda,estado).subscribe((result: Prestamo[]) => {
      //se esperan dos valores en la lista
      expect(result.length).toBe(2);
    });
    const request = httpMock.expectOne(`${service.prestamosURL + "prestamosFiltrados/" + strBusqueda+"/"+estado}`);
    expect(request.request.method).toBe('GET');
    request.flush(prestamos);
  });

  it('busquedaBitacora', () => {
    //Arrage
    let strBusqueda: string;
    strBusqueda = "6";

    //Act
    service.busquedaBitacora(strBusqueda).subscribe((result: Prestamo[]) => {
      //se esperan dos valores en la lista
      expect(result.length).toBe(2);
    });
    const request = httpMock.expectOne(`${service.prestamosURL + "bitacoraPrestamos/" + strBusqueda}`);
    expect(request.request.method).toBe('GET');
    request.flush(prestamos);
  });

  it('reporte2', () => {
    //Act
    service.reporte2().subscribe((result: Prestamo[]) => {
      //se esperan dos valores en la lista
      expect(result.length).toBe(2);
    });
    const request = httpMock.expectOne(`${service.prestamosURL + "misPrestamos/0/FINALIZADO" }`);
    expect(request.request.method).toBe('GET');
    request.flush(prestamos);
  });

  it('reporte1', () => {
    //Act
    service.reporte1().subscribe((result: Prestamo[]) => {
      //se esperan dos valores en la lista
      expect(result.length).toBe(2);
    });
    const request = httpMock.expectOne(`${service.prestamosURL + "misPrestamos/1/FINALIZADO" }`);
    expect(request.request.method).toBe('GET');
    request.flush(prestamos);
  });

  it('reporte1Cuota', () => {
    //Act
    service.reporte1Cuota().subscribe((result: Object[]) => {
      //se esperan dos valores en la lista
      expect(result.length).toBe(2);
    });
    const request = httpMock.expectOne(`${service.prestamosURL + "misPrestamos/reporte1" }`);
    expect(request.request.method).toBe('GET');
    request.flush(prestamos);
  });

  it('reporte3', () => {
    //Act
    service.reporte3().subscribe((result: Object[]) => {
      //se esperan dos valores en la lista
      expect(result.length).toBe(2);
    });
    const request = httpMock.expectOne(`${service.prestamosURL + "misPrestamos/reporte3" }`);
    expect(request.request.method).toBe('GET');
    request.flush(prestamos);
  });
});
