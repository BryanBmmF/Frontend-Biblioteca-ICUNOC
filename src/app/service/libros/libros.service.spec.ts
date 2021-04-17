import { TestBed } from '@angular/core/testing';
import { LibrosService } from './libros.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { Libro } from 'src/app/models/libro';
import libros from '../../test/fileTest/libros.json';
import libro from '../../test/fileTest/libro.json';

describe('LibrosService', () => {
  //el servicio que utiliza el test
  let service: LibrosService;
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
        LibrosService,
        CookieService]
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    service = new LibrosService(httpClient);
  });



  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  it('lista', () => {
    service.lista().subscribe((result: Libro[]) => {
      //se esperan dos valores en la lista
      expect(result.length).toBe(3);
    });
    const request = httpMock.expectOne(`${service.libroURL + "listaLibro"}`);
    expect(request.request.method).toBe('GET');
    request.flush(libros);
  });

  it('detalle', () => {
    //Arrage
    let idLibro: number;
    idLibro = 1;

    //Act
    service.detalle(idLibro).subscribe((result: Libro) => {
      expect(result.nombre).toBe("Ecucaciones Diferenciales");
    });

    //expect
    const request = httpMock.expectOne(`${service.libroURL + "detalleLibro/" + idLibro}`);
    expect(request.request.method).toBe('GET');
    request.flush(libro);
  });

  it('detalleCodigo', () => {
    //Arrage
    let codigoLibro: string;
    codigoLibro = "067662";

    //Act
    service.detalleCodigo(codigoLibro).subscribe((result: Libro) => {
      expect(result.nombre).toBe("Ecucaciones Diferenciales");
    });

    //expect
    const request = httpMock.expectOne(`${service.libroURL + "detalleLibroC/" + codigoLibro}`);
    expect(request.request.method).toBe('GET');
    request.flush(libro);
  });

  it('save', () => {
    //Arrage

    //Act
    service.save(libro).subscribe((result: Libro) => {
      expect(result.nombre).toBe("Ecucaciones Diferenciales");
    });

    //expect
    const request = httpMock.expectOne(`${service.libroURL + "crearLibro"}`, libro);
    expect(request.request.method).toBe('POST');
    request.flush(libro);
  });

  it('update', () => {
    //Arrage
    let idLibro: number;
    idLibro = 1;

    //Act
    service.update(idLibro, libro).subscribe((result: Libro) => {
      expect(result.nombre).toBe("Ecucaciones Diferenciales");
    });

    //expect
    const request = httpMock.expectOne(`${service.libroURL + "actualizar/" + idLibro}`, libro);
    expect(request.request.method).toBe('PUT');
    request.flush(libro);
  });

  it('delete', () => {
    //Arrage
    let idLibro: number;
    idLibro = 1;
    
    //Act
    service.delete(idLibro).subscribe((result: Libro) => {
      expect(result.nombre).toBe("Ecucaciones Diferenciales");
    });

    //expect
    const request = httpMock.expectOne(`${service.libroURL + "eliminar/" + idLibro}`);
    expect(request.request.method).toBe('DELETE');
    request.flush(libro);
  });

  it('busquedaFiltrada', () => {
    //Arrage
    let strBusqueda: string;
    strBusqueda = "6";

    //Act
    service.busquedaFiltrada(strBusqueda).subscribe((result: Libro[]) => {
      //se esperan dos valores en la lista
      expect(result.length).toBe(3);
    });
    const request = httpMock.expectOne(`${service.libroURL + "librosFiltrados/" + strBusqueda}`);
    expect(request.request.method).toBe('GET');
    request.flush(libros);
  });

});


