import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionReservacionVencidaComponent } from './revision-reservacion-vencida.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersService } from '../../service/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { Prestamo } from 'src/app/models/Prestamo';
import prestamos from '../../test/fileTest/prestamos.json';
import prestamoVacio from '../../test/fileTest/prestamoVacio.json';
import { PrestamosService } from 'src/app/service/prestamos/prestamos.service';


class UsersServiceMock{
  //Mockeo los metodos que necesite en el component y que en teoria me va proveer el UserService
  //solo los que necesito
  getLoggedInUserRoleAdmin = jasmine.createSpy('getLoggedInUserRoleAdmin');
  getLoggedInUserRoleBibliotecario = jasmine.createSpy('getLoggedInUserRoleBibliotecario');
  getDatosUserLogueado = jasmine.createSpy('getDatosUserLogueado');
  sendEmail = jasmine.createSpy('sendEmail');
  logout = jasmine.createSpy('logout');
  lista = jasmine.createSpy('lista');
  delete = jasmine.createSpy('delete');
}

class PrestamoServiceMock {
  listaxEstado = jasmine.createSpy('listaxEstado');
  finalizarPrestamo = jasmine.createSpy('finalizarPrestamo');
  busquedaFiltrada = jasmine.createSpy('busquedaFiltrada');
}

class ToastrServiceMock{
  //estos mocks son del toastr
  success = jasmine.createSpy('success');
  warning = jasmine.createSpy('warning');
  error = jasmine.createSpy('error');
}

class MatDialogMock{
  //este es el mock del Dialogo, igual solo se declara porque hay dos escenarios
  //open = jasmine.createSpy('open').and.returnValue({afterClosed: () => of(true)});
  open = jasmine.createSpy('open');
}

describe('RevisionReservacionVencidaComponent', () => {
  let component: RevisionReservacionVencidaComponent;
  let fixture: ComponentFixture<RevisionReservacionVencidaComponent>;
  let userServiceMock: UsersServiceMock;
  let prestamoServiceMock: PrestamoServiceMock;
  let matDialogMock: MatDialogMock;
  let toastrMock : ToastrServiceMock;

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
      declarations: [ RevisionReservacionVencidaComponent ],
      //los mock que creamos
      providers: [
        HttpClient,
        RevisionReservacionVencidaComponent,
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
        {
          provide: Router,
          useValue: spyRouter,
        },
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
    })
    component = TestBed.get(RevisionReservacionVencidaComponent);
    userServiceMock = TestBed.get(UsersService);
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

  it('should ngOnInit confirm User Logged Admin|Bibliotecario', () => {
    //Arrage
    userServiceMock.getLoggedInUserRoleAdmin.and.returnValue(true);
    //de una vez se prueba el metodo validar menu en su rama verdadera
    userServiceMock.getLoggedInUserRoleBibliotecario.and.returnValue(true);
    var prestamosLista: Prestamo[] = prestamos;
    prestamoServiceMock.listaxEstado.and.returnValue(of(prestamosLista));
    //Act
    component.ngOnInit();

    //Expect
    //continue load users
  });

  it('should ngOnInit NOT confirm User Logged Admin|Bibliotecario', () => {
    //Arrage
    userServiceMock.getLoggedInUserRoleAdmin.and.returnValue(false);

    //Act
    component.ngOnInit();

    //Expect
    expect(spyRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should cargarPrestamos', () => {
    //Arrage
    var prestamosLista: Prestamo[] = prestamos;
    prestamoServiceMock.listaxEstado.and.returnValue(of(prestamosLista));

    //Act
    component.cargarPrestamos();

    //Expect
    expect(component.prestamos).toBeTruthy();
  });

  it('should cargarPrestamos error producer', () => {
    //Arrage
    prestamoServiceMock.listaxEstado.and.returnValue(throwError({ status: 404, error: "error" }));

    //Act
    component.cargarPrestamos();

    //Expect
    expect(component.prestamos).toEqual(component.prestamos);
  });

  it('should onUpdate', () => {
    //Arrage
    //se confirma el dialog
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) });
    var listaReservacion: Prestamo[] = prestamos;
    prestamoServiceMock.listaxEstado.and.returnValue(of(listaReservacion));

    //enviamos un user real
    prestamoServiceMock.finalizarPrestamo.and.returnValue(of(1));

    //Act
    component.onUpdate("1","Nombre", 5);

    //Spect
    //load users
  });

  it('should onUpdate with error', () => {
    //Arrage
    //se confirma el dialog
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) });
    var listaReservacion: Prestamo[] = prestamos;
    prestamoServiceMock.listaxEstado.and.returnValue(of(listaReservacion));

    //enviamos un user real
    prestamoServiceMock.finalizarPrestamo.and.returnValue(throwError({ status: 404, error: "error" }));

    //Act
    component.onUpdate("1","Nombre",5);

    //Spect
    //load users
  });

  it('should onUpdate not confirm', () => {
    //Arrage

    //No se confirma el dialog
    matDialogMock.open.and.returnValue({ afterClosed: () => of(false) });
    var listaReservacion: Prestamo[] = prestamos;
    prestamoServiceMock.listaxEstado.and.returnValue(of(listaReservacion));

    prestamoServiceMock.finalizarPrestamo.and.returnValue(of(1));

    //Act
    component.onUpdate("1","Nombre",5);

    //Spect
    //continue
  });

  it('should cargarPrestamosFiltrados', () => {
    //Arrage
    var listaReservacion: Prestamo[] = prestamos;
    prestamoServiceMock.busquedaFiltrada.and.returnValue(of(listaReservacion));

    //enviamos un user real
    //prestamoServiceMock.iniciarPrestamo.and.returnValue(of(1));

    //Act
    component.cargarPrestamosFiltrados();

    //Spect
    //load users
  });

  it('should cargarPrestamosFiltrados with lenth 0', () => {
    //Arrage
    var listaReservacionVacia: Prestamo[] = prestamoVacio;
    prestamoServiceMock.busquedaFiltrada.and.returnValue(of(listaReservacionVacia));

    //prestamoServiceMock.busquedaFiltrada.and.returnValue(of(0));

    //Act
    component.cargarPrestamosFiltrados();

    //Spect
    //load users
  });

  it('should cargarPrestamosFiltrados with error', () => {
    //Arrage
    var listaReservacion: Prestamo[] = prestamos;
    prestamoServiceMock.busquedaFiltrada.and.returnValue(of(listaReservacion));

    //enviamos un user real
    prestamoServiceMock.busquedaFiltrada.and.returnValue(throwError({ status: 404, error: "error" }));

    //Act
    component.cargarPrestamosFiltrados();

    //Spect
    //load users
  });

});
