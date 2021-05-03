import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { of } from 'rxjs';
import { Prestamo } from 'src/app/models/Prestamo';
import { PrestamosService } from 'src/app/service/prestamos/prestamos.service';
import prestamos from '../../test/fileTest/prestamos.json';
import prestamoVacio from '../../test/fileTest/prestamoVacio.json';

import { RevisionBitacoraComponent } from './revision-bitacora.component';

class PrestamoServiceMock {
  busquedaBitacora = jasmine.createSpy('busquedaBitacora');
}


class ToastrServiceMock {
  //estos mocks son del toastr
  success = jasmine.createSpy('success');
  warning = jasmine.createSpy('warning');
  error = jasmine.createSpy('error');
}

class MatDialogMock {
  //este es el mock del Dialogo, igual solo se declara porque hay dos escenarios
  //open = jasmine.createSpy('open').and.returnValue({afterClosed: () => of(true)});
  open = jasmine.createSpy('open');
}

describe('RevisionBitacoraComponent', () => {
  let component: RevisionBitacoraComponent;
  let fixture: ComponentFixture<RevisionBitacoraComponent>;
  let prestamoServiceMock: PrestamoServiceMock;
  let matDialogMock: MatDialogMock;
  let toastrMock: ToastrServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        //Estos 2 imports casi que van de cajon siempre
        HttpClientTestingModule,
      ],
      declarations: [ RevisionBitacoraComponent ],
      //los mock que creamos
      providers: [
        HttpClient,
        RevisionBitacoraComponent,
        {
          provide: PrestamosService,
          useClass: PrestamoServiceMock,
        },
        {
          provide: ToastrService,
          useClass: ToastrServiceMock,
        },
        {
          provide: MatDialog,
          useClass: MatDialogMock,
        },
      ]
    });

    component = TestBed.get(RevisionBitacoraComponent);
    prestamoServiceMock = TestBed.get(PrestamosService);
    matDialogMock = TestBed.get(MatDialog);
    toastrMock = TestBed.get(ToastrService);

    component.ngOnInit();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cargarPrestamosFiltrados', () => {
    //Arrage
    var listaReservacion: Prestamo[] = prestamos;
    prestamoServiceMock.busquedaBitacora.and.returnValue(of(listaReservacion));

    //enviamos un user real
    //prestamoServiceMock.iniciarPrestamo.and.returnValue(of(1));

    //Act
    component.cargarPrestamosFiltrados();

    //Spect
    //load presatmos
  });

  it('should cargarPrestamosFiltrados with lenth 0', () => {
    //Arrage
    var listaReservacionVacia: Prestamo[] = prestamoVacio;
    prestamoServiceMock.busquedaBitacora.and.returnValue(of(listaReservacionVacia));

    //prestamoServiceMock.busquedaFiltrada.and.returnValue(of(0));

    //Act
    component.cargarPrestamosFiltrados();

    //Spect
    //load 0 prestamos
  });

  it('should cargarPrestamosFiltrados with error', () => {
    //Arrage
    var listaReservacion: Prestamo[] = prestamos;
    prestamoServiceMock.busquedaBitacora.and.returnValue(of(listaReservacion));

    //enviamos un user real
    prestamoServiceMock.busquedaBitacora.and.returnValue(throwError({ status: 404, error: "error" }));

    //Act
    component.cargarPrestamosFiltrados();

    //Spect
    //load error
  });

  it('should limpiar', () => {
    component.limpiar();
  });
});
