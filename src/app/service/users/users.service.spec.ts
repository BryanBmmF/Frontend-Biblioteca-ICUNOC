import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/User';

import { UsersService } from './users.service';

import users from '../../test/fileTest/users.json';
import user from 'src/app/test/fileTest/user.json';
import infoBiblioteca from 'src/app/test/fileTest/infoBiblioteca.json';
import emailBody from 'src/app/test/fileTest/mail.json';
import { Observable } from 'rxjs';
import { EmailBody } from 'src/app/models/EmailBody';
import { InfoBiblioteca } from 'src/app/models/InfoBiblioteca';

describe('UsersService', () => {
  //el servicio que utiliza el test
  let service: UsersService;
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
        UsersService,
        CookieService]
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    service = new UsersService(httpClient, TestBed.inject(CookieService), TestBed.inject(Router));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('lista', () => {
    // const dummy : User[] = [
    //   {
    //     "id": 1,
    //     "nombre": "user1",
    //     "numeroRegistro": "201730159",
    //     "username": "user1",
    //     "password": "password",
    //     "tipo": "Administrador",
    //     "correo": "correo"
    //   },
    //   {
    //     "id": 2,
    //     "nombre": "user2",
    //     "numeroRegistro": "201730159",
    //     "username": "user2",
    //     "password": "password",
    //     "tipo": "Administrador",
    //     "correo": "correo"
    //   }
    // ];

    service.lista().subscribe((result: User[]) => {
      //se esperan dos valores en la lista
      expect(result.length).toBe(2);
    });
    const request = httpMock.expectOne(`${service.usuarioUrl + "/lista"}`);
    expect(request.request.method).toBe('GET');
    request.flush(users);
  });

  it('detailId', () => {
    //Arrage
    let idUser: number;
    idUser = 1;

    //Act
    service.detailId(idUser).subscribe((result: User) => {
      expect(result.nombre).toBe("user1");
    });

    //expect
    const request = httpMock.expectOne(`${service.usuarioUrl + "/detailId/" + idUser}`);
    expect(request.request.method).toBe('GET');
    request.flush(user);
  });

  it('detailUsername', () => {
    //Arrage
    let username: string;
    username = "user1";

    //Act
    service.detailUsername(username).subscribe((result: User) => {
      expect(result.username).toBe(username);
    });

    //expect
    const request = httpMock.expectOne(`${service.usuarioUrl + "/detailUsername/" + username}`);
    expect(request.request.method).toBe('GET');
    request.flush(user);
  });

  it('save', () => {
    //Arrage
    //const userMock = new User("user1","201730159","user1","password1","Administrador","correo");

    //Act
    service.save(user).subscribe((result: User) => {
      expect(result.nombre).toBe('user1');
    });

    //expect
    const request = httpMock.expectOne(`${service.usuarioUrl + "/create"}`, user);
    expect(request.request.method).toBe('POST');
    request.flush(user);
  });

  it('update', () => {
    //Arrage
    let idUser: number;
    idUser = 1;

    //Act
    service.update(idUser, user).subscribe((result: User) => {
      expect(result.nombre).toBe('user1');
    });

    //expect
    const request = httpMock.expectOne(`${service.usuarioUrl + "/update/" + idUser}`, user);
    expect(request.request.method).toBe('PUT');
    request.flush(user);
  });

  it('delete', () => {
    //Arrage
    let idUser: number;
    idUser = 1;
    
    //Act
    service.delete(idUser).subscribe((result: User) => {
      expect(result.nombre).toBe('user1');
    });

    //expect
    const request = httpMock.expectOne(`${service.usuarioUrl + "/delete/" + idUser}`);
    expect(request.request.method).toBe('DELETE');
    request.flush(user);
  });

  it('sendEmail', () => {
    //Arrage
    //const userMock: User = user;

    //Act
    service.sendEmail(emailBody).subscribe((result: EmailBody) => {
      expect(result.email).toBe('email');
    });

    //expect
    const request = httpMock.expectOne(`${service.urlSendEmail}`, emailBody);
    expect(request.request.method).toBe('POST');
    request.flush(emailBody);
  });

  it('login', () => {
    //Arrage
    let userMock = "user";
    let passwordMock = "password";
    let tokenReturn = "xyz";

    //Act
    service.login(userMock, passwordMock).subscribe((result: string) => {
      expect(result).toBe(tokenReturn);
    });

    //expect
    const request = httpMock.expectOne(`${service.Url + "/authorize"}`, null);
    expect(request.request.method).toBe('POST');
    request.flush(tokenReturn);
  });

  it('getAdminLogged', () => {
    //Arrage
    let acces = "auth";

    //Act
    service.getAdminLogged().subscribe((result: string) => {
      expect(result).toBe(acces);
    });

    //expect
    const request = httpMock.expectOne(`${service.Url + "/permissionAdmin"}`);
    expect(request.request.method).toBe('GET');
    request.flush(acces);
  });

  it('getUserLogged', () => {
    //Arrage
    let acces = "auth";

    //Act
    service.getUserLogged().subscribe((result: string) => {
      expect(result).toBe(acces);
    });

    //expect
    const request = httpMock.expectOne(`${service.Url + "/permissionUser"}`);
    expect(request.request.method).toBe('GET');
    request.flush(acces);
  });

  it('logout', () => {

    //Act
    service.logout();

  });

  it('setTokenAndUser', () => {
    //Arrage
    let userMock = "user1";
    let tokenMock = "xyz"

    //Act
    service.setTokenAndUser(tokenMock, userMock);
    
  });

  it('getDatosUserLogueado', () => {

    //Act
    service.getDatosUserLogueado();

  });

  it('setDatosUserLogueadoTrue', () => {
    //spy del metodo getLoggedInUserRoleAdmin para retornar true
    var spy = spyOn(service, 'getLoggedInUserRoleAdmin').and.returnValue(true);

    service.setDatosUserLogued(user);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/usuarios']);

  });

  it('setDatosUserLogueadoFalse', () => {
    //spy del metodo getLoggedInUserRoleAdmin para retornar false
    var spy = spyOn(service, 'getLoggedInUserRoleAdmin').and.returnValue(false);

    service.setDatosUserLogued(user);

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/listaCategoriasAdmin');

  });

  it('getLoggedInUserRoleAdmin', () => {
    //spy del metodo getItem para retornar un null
    var spy = spyOn(sessionStorage, 'getItem').and.returnValue(null);

    service.getLoggedInUserRoleAdmin();

  });

  it('detailIdInfoBiblioteca', () => {
    //Arrage
    let idInfo: number;
    idInfo = 1;

    //Act
    service.detailIdInfoBiblioteca(idInfo).subscribe((result: InfoBiblioteca) => {
      expect(result.correo).toBe("correo");
    });

    //expect
    const request = httpMock.expectOne(`${service.urlInfoBiblioteca + "/detailId/" + idInfo}`);
    expect(request.request.method).toBe('GET');
    request.flush(infoBiblioteca);
  });

  it('updateInfoBiblioteca', () => {
    //Arrage
    let idInfo: number;
    idInfo = 1;

    //Act
    service.updateInfoBiblioteca(idInfo, infoBiblioteca).subscribe((result: InfoBiblioteca) => {
      expect(result.correo).toBe('correo');
    });

    //expect
    const request = httpMock.expectOne(`${service.urlInfoBiblioteca + "/actualizar/" + idInfo}`, infoBiblioteca);
    expect(request.request.method).toBe('PUT');
    request.flush(infoBiblioteca);
  });

});


