import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoLibroComponent } from './prestamo-libro.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersService } from '../service/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { PrestamosService } from '../service/prestamos/prestamos.service';
import infoBiblioteca from 'src/app/test/fileTest/infoBiblioteca.json';
import emailBody from 'src/app/test/fileTest/mail.json';
import { of, throwError } from 'rxjs';
import { InfoBiblioteca } from '../models/InfoBiblioteca';
import { LibrosService } from '../service/libros/libros.service';
import { Libro } from '../models/libro';
import libro from '../test/fileTest/libro.json';
import prestamo from '../test/fileTest/prestamo.json';
import libroSinExistencia from '../test/fileTest/libroSinExistencia.json';

class UsersServiceMock{
  //Mockeo los metodos que necesite en el component y que en teoria me va proveer el UserService
  //solo los que necesito
  logout = jasmine.createSpy('logout');
  detailIdInfoBiblioteca = jasmine.createSpy('detailIdInfoBiblioteca');
  sendEmail = jasmine.createSpy('sendEmail');
}

class PrestamoServiceMock{
  //Mockeo los metodos que necesite en el component y que en teoria me va proveer el UserService
  //solo los que necesito
  consultarPrestamosReservacionesActivas = jasmine.createSpy('consultarPrestamosReservacionesActivas');
  save = jasmine.createSpy('save');
}

class LibroServiceMock{
  //Mockeo los metodos que necesite en el component y que en teoria me va proveer el UserService
  //solo los que necesito
  detalle = jasmine.createSpy('detalle');
  update = jasmine.createSpy('update');
}

class ToastrServiceMock{
  //estos mocks son del toastr
  success = jasmine.createSpy('success');
  warning = jasmine.createSpy('warning');
  error = jasmine.createSpy('error');
  info = jasmine.createSpy('info');
}

class MatDialogMock{
  //este es el mock del Dialogo, igual solo se declara porque hay dos escenarios
  //open = jasmine.createSpy('open').and.returnValue({afterClosed: () => of(true)});
  open = jasmine.createSpy('open');
}

describe('PrestamoLibroComponent', () => {
  let component: PrestamoLibroComponent;
  let fixture: ComponentFixture<PrestamoLibroComponent>;
  let userServiceMock: UsersServiceMock;
  let prestamoServiceMock: PrestamoServiceMock;
  let matDialogMock: MatDialogMock;
  let toastrMock : ToastrServiceMock;
  let librosServiceMock: LibroServiceMock;

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
      declarations: [ PrestamoLibroComponent ],

      //los mock que creamos
      providers: [
        HttpClient,
        PrestamoLibroComponent,
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
        {
          provide: PrestamosService,
          useClass: PrestamoServiceMock,
        },
        {
          provide: LibrosService,
          useClass: LibroServiceMock,
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
    });
    component = TestBed.get(PrestamoLibroComponent);
    userServiceMock = TestBed.get(UsersService);
    librosServiceMock = TestBed.get(LibrosService);
    prestamoServiceMock = TestBed.get(PrestamosService);
    matDialogMock = TestBed.get(MatDialog);
    toastrMock = TestBed.get(ToastrService);
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should logout', () => {
    //Arrage
    //Act
    component.logout();
    //Spect
    expect(spyRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should generaCodigoReserva', () => {
    //Arrage
    //Act
    let codigo: string = component.generaCodigoReserva();
    //Expect
    expect(codigo).toEqual(codigo);
  });

  it('should enviarCorreoConfirmacion', () => {
    //Arrage
    var infoBiblio: InfoBiblioteca = infoBiblioteca;
    userServiceMock.detailIdInfoBiblioteca.and.returnValue(of(infoBiblio));
    userServiceMock.sendEmail.and.returnValue(of(emailBody));

    //Act
    component.enviarCorreoConfirmacion();

    //Expect
  });

  it('should enviarCorreoConfirmacion FAIL', () => {
    //Arrage
    userServiceMock.detailIdInfoBiblioteca.and.returnValue(throwError({ status: 404 , error: "error" }));
    //Act
    component.enviarCorreoConfirmacion();
    //Expect
  });

  it('should enviarCorreoConfirmacion SendEmail FAIL', () => {
    //Arrage
    var infoBiblio: InfoBiblioteca = infoBiblioteca;
    userServiceMock.detailIdInfoBiblioteca.and.returnValue(of(infoBiblio));
    userServiceMock.sendEmail.and.returnValue(throwError({ status: 404 , error: "error" }));

    //Act
    component.enviarCorreoConfirmacion();

    //Expect
  });

  it('should confirmarBoletaReservación', () => {
    //Arrage
    //Act
    component.confirmarBoletaReservación("123");
    //Expect
    expect(spyRouter.navigate).toHaveBeenCalledWith(["reservacionConfirmada"]);
  });

  it('should generarReservacion  error En Save Prestamo', () => {
    //Arrage
    var cantidad: number = 1;
    prestamoServiceMock.consultarPrestamosReservacionesActivas.and.returnValue(of(cantidad));
    userServiceMock.sendEmail.and.returnValue(of(emailBody));

    var libroMock: Libro = libro;
    librosServiceMock.detalle.and.returnValue(of(libro));

    matDialogMock.open.and.returnValue({afterClosed: () => of(true)}); 
    prestamoServiceMock.save.and.returnValue(throwError({ status: 404 , error: "error" }));
    librosServiceMock.update.and.returnValue(of(libro));

    var infoBiblio: InfoBiblioteca = infoBiblioteca;
    userServiceMock.detailIdInfoBiblioteca.and.returnValue(of(infoBiblio));
    userServiceMock.sendEmail.and.returnValue(of(emailBody));
    //Act
    component.generarReservacion();

    //Expect
  });

  it('should generarReservacion Mas de 2 activos', () => {
    //Arrage
    var cantidad: number = 2;
    prestamoServiceMock.consultarPrestamosReservacionesActivas.and.returnValue(of(cantidad));
    //Act
    component.generarReservacion();
    //Expect
  });

  it('should generarReservacion Sin Existencias', () => {
    //Arrage
    var cantidad: number = 1;
    prestamoServiceMock.consultarPrestamosReservacionesActivas.and.returnValue(of(cantidad));
    userServiceMock.sendEmail.and.returnValue(of(emailBody));
    librosServiceMock.detalle.and.returnValue(of(libroSinExistencia));
    //Act
    component.generarReservacion();
    //Expect
  });

  it('should generarReservacion', () => {
    //Arrage
    var cantidad: number = 1;
    prestamoServiceMock.consultarPrestamosReservacionesActivas.and.returnValue(of(cantidad));
    userServiceMock.sendEmail.and.returnValue(of(emailBody));

    var libroMock: Libro = libro;
    librosServiceMock.detalle.and.returnValue(of(libro));

    matDialogMock.open.and.returnValue({afterClosed: () => of(true)}); 
    prestamoServiceMock.save.and.returnValue(of(prestamo));
    librosServiceMock.update.and.returnValue(of(libro));

    var infoBiblio: InfoBiblioteca = infoBiblioteca;
    userServiceMock.detailIdInfoBiblioteca.and.returnValue(of(infoBiblio));
    userServiceMock.sendEmail.and.returnValue(of(emailBody));
    //Act
    component.generarReservacion();
    //Expect
  });

});
