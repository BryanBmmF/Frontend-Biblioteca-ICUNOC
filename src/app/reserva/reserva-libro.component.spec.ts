import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Data, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { Prestamo } from '../models/Prestamo';
import { PrestamosService } from '../service/prestamos/prestamos.service';
import prestamo from '../test/fileTest/prestamo.json';
import { ReservaLibroComponent } from './reserva-libro.component';

class PrestamoServiceMock {
  detail = jasmine.createSpy('detail');
}

class ToastrServiceMock {
  //estos mocks son del toastr
  success = jasmine.createSpy('success');
  warning = jasmine.createSpy('warning');
  error = jasmine.createSpy('error');
}

describe('ReservaLibroComponent', () => {
  let component: ReservaLibroComponent;
  let prestamoServiceMock: PrestamoServiceMock;
  let toastrMock: ToastrServiceMock;

    //el roter spy falso que emula las rutas
    const spyRouter = {
      navigate: jasmine.createSpy('navigate'),
      navigateByUrl: jasmine.createSpy('navigateByUrl'),
    };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        //Estos 2 imports casi que van de cajon siempre
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ ReservaLibroComponent ],
      //los mock que creamos
      providers: [
        HttpClient,
        ReservaLibroComponent,
        {
          provide: PrestamosService,
          useClass: PrestamoServiceMock,
        },
        {
          provide: Router,
          useValue: spyRouter,
        },
        {
          provide: ToastrService,
          useClass: ToastrServiceMock,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: convertToParamMap({ id: '1' }),
            },
            params: {
              subscribe: (fn: (value: Data) => void) => fn({
              }),
            }
          }
        }
      ]
    })
    component = TestBed.get(ReservaLibroComponent);
    prestamoServiceMock = TestBed.get(PrestamosService);
    toastrMock = TestBed.get(ToastrService);
  });

   it('should create', () => {
     expect(component).toBeTruthy();
   });

   it('should ngOnInit', () => {
    //Arrage

    //Act
    component.codigoReservacionVar="abc";
    component.ngOnInit();
  });

  it('should generarPdf with error', () => {
    //Arrage
    var libroDe: Prestamo = null;
    prestamoServiceMock.detail.and.returnValue(of(libroDe));
    //enviamos un user real
    prestamoServiceMock.detail.and.returnValue(throwError({ status: 404, error: "error" }));
  
    //Act
    component.generarPDF();

  });

  it('should generarPdf', () => {
    //Arrage
    var libroDe: Prestamo = prestamo;
    prestamoServiceMock.detail.and.returnValue(of(libroDe));
    //Act
    component.generarPDF();

  });
});
