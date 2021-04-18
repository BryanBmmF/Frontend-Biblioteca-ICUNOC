import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/service/users/users.service';

import { SolicitudResetPasswordComponent } from './solicitud-reset-password.component';
import emailBody from 'src/app/test/fileTest/mail.json';
import user from 'src/app/test/fileTest/user.json';
import { of, throwError } from 'rxjs';

class UsersServiceMock {
  getLoggedInUserRoleAdmin = jasmine.createSpy('getLoggedInUserRoleAdmin');
  getLoggedInUserRoleBibliotecario = jasmine.createSpy('getLoggedInUserRoleBibliotecario');
  getDatosUserLogueado = jasmine.createSpy('getDatosUserLogueado');
  sendEmail = jasmine.createSpy('sendEmail');
  logout = jasmine.createSpy('logout');
}

class ToastrServiceMock {
  success = jasmine.createSpy('success');
  warning = jasmine.createSpy('warning');
  error = jasmine.createSpy('error');
  info = jasmine.createSpy('info');
}
describe('SolicitudResetPasswordComponent', () => {
  let component: SolicitudResetPasswordComponent;
  //los mocks que necesita mi component
  let userServiceMock: UsersServiceMock;
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
      declarations: [ SolicitudResetPasswordComponent ],
      providers: [
        HttpClient,
        SolicitudResetPasswordComponent,
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
        {
          provide: Router,
          useValue: spyRouter,
        },
        {
          provide: ToastrService,
          useClass: ToastrServiceMock,
        }

      ]
    });
    //inject de los mock para hacer referencia a los reales
    component = TestBed.get(SolicitudResetPasswordComponent);
    toastrMock = TestBed.get(ToastrService);
    userServiceMock = TestBed.get(UsersService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit confirm User Logged Admin|Bibliotecario', () => {
    //Arrage
    userServiceMock.getLoggedInUserRoleAdmin.and.returnValue(true);
    //de una vez se prueba el metodo validar menu en su rama verdadera
    userServiceMock.getLoggedInUserRoleBibliotecario.and.returnValue(true);

    //Act
    component.ngOnInit();

    //Expect
    //continue load users
  });
  it('should validar menu loggedBibliotecario false', () => {
    //Arrage
    userServiceMock.getLoggedInUserRoleBibliotecario.and.returnValue(false);

    //Act
    component.validarMenu();

    //Expect
    //continue
  });

  it('should ngOnInit NOT confirm User Logged Admin|Bibliotecario', () => {
    //Arrage
    userServiceMock.getLoggedInUserRoleAdmin.and.returnValue(false);

    //Act
    component.ngOnInit();

    //Expect
    expect(spyRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should enviarSolicitud', () => {
    //Arrage
    userServiceMock.getDatosUserLogueado.and.returnValue(user);
    userServiceMock.sendEmail.and.returnValue(of(emailBody));

    //Act
    component.enviarSolicitud();

    //Expect
    expect(spyRouter.navigate).toHaveBeenCalledWith(['/solicitud-reset-password']);
  });

  it('should enviarSolicitud Fail', () => {
    //Arrage
    userServiceMock.getDatosUserLogueado.and.returnValue(user);
    //se provoca el fallo
    userServiceMock.sendEmail.and.returnValue(throwError({ status: 404 , error: "error" }));

    //Act
    component.enviarSolicitud();

    //Expect
    expect(spyRouter.navigate).toHaveBeenCalledWith(['/solicitud-reset-password']);
  });

  it('should logout', () => {
    //Arrage

    //Act
    component.logout();

    //Spect
    expect(spyRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
