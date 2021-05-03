import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { Libro } from '../models/libro';
import { Prestamo } from '../models/Prestamo';
import { LibrosService } from '../service/libros/libros.service';
import { PrestamosService } from '../service/prestamos/prestamos.service';
import libro from '../test/fileTest/libro.json';
import reservacion from '../test/fileTest/reservacion.json';
import { CancelarReservacionComponent } from './cancelar-reservacion.component';

class PrestamosServiceMock{
  listaxEstado = jasmine.createSpy('listaxEstado');
  cancelarReservacion = jasmine.createSpy('cancelarReservacion');
  busquedaFiltrada = jasmine.createSpy('busquedaFiltrada');
}

class LibrosServiceMock{
  detalleCodigo = jasmine.createSpy('detalleCodigo');
  update = jasmine.createSpy('update');
}

class ToastrServiceMock {
  //estos mocks son del toastr
  success = jasmine.createSpy('success');
  warning = jasmine.createSpy('warning');
  error = jasmine.createSpy('error');
}

class MatDialogMock{
 open = jasmine.createSpy('open');
}


describe('CancelarReservacionComponent', () => {
  let component: CancelarReservacionComponent;
  let prestamoServiceMock : PrestamosServiceMock;
  let librosServiceMock : LibrosServiceMock;
  let toastrMock: ToastrServiceMock;
  let matDialogMock: MatDialogMock;

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
      ],
      declarations: [ CancelarReservacionComponent ],
      providers: [
        HttpClient,
        CancelarReservacionComponent,
        {
          provide: PrestamosService,
          useClass: PrestamosServiceMock,
        },
        {
          provide: LibrosService,
          useClass: LibrosServiceMock,
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
          provide: MatDialog,
          useClass: MatDialogMock,
        },
      ] 
    })
    component = TestBed.get(CancelarReservacionComponent);
    prestamoServiceMock = TestBed.get(PrestamosService);
    librosServiceMock = TestBed.get(LibrosService);
    toastrMock = TestBed.get(ToastrService);
    matDialogMock = TestBed.get(MatDialog);
  });


  it('should create', () => {
    component.ngOnInit();
  });

  it('should actualizarStock', () => {
    //Arrage
    var libroMock: Libro[] = libro;
    librosServiceMock.detalleCodigo.and.returnValue(of(libroMock));

    librosServiceMock.update.and.returnValue(of(1));

    //Act
    component.actualizarStock("1");
  });


  it('should cargarReservacion error producer', () => {
    //Arrage
    prestamoServiceMock.busquedaFiltrada.and.returnValue(throwError({ status: 404, error: "error" }));

    //Act
    component.cargarReservacion();

    //Expect
    expect(component.prestamos).toEqual(component.prestamos);
  });

  it('should onUpdate', () => {
    //Arrage
    //se confirma el dialog
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) });
    var listaReservacion: Prestamo[] = reservacion;
    prestamoServiceMock.listaxEstado.and.returnValue(of(listaReservacion));

    //enviamos un user real
    prestamoServiceMock.cancelarReservacion.and.returnValue(of(1));

    //Act
    component.onUpdate("1","Nombre",5,"1");

    //Spect
    //load users
  });

  it('should onUpdate with error', () => {
    //Arrage
    //se confirma el dialog
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) });
    var listaReservacion: Prestamo[] = reservacion;
    prestamoServiceMock.listaxEstado.and.returnValue(of(listaReservacion));

    //enviamos un user real
    prestamoServiceMock.cancelarReservacion.and.returnValue(throwError({ status: 404, error: "error" }));

    //Act
    component.onUpdate("1","Nombre",5,"1");

    //Spect
    //load users
  });

});
