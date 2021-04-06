import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/User';

import { UsersService } from './users.service';

import users from '../../test/fileTest/users.json';
import user from 'src/app/test/fileTest/user.json';
import { Observable } from 'rxjs';

describe('UsersService', () => {
  //el servicio que utiliza el test
  let service: UsersService;
  //los mocks
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
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
    const dummy : User[] = [
      {
        "id": 1,
        "nombre": "user1",
        "numeroRegistro": "201730159",
        "username": "user1",
        "password": "password",
        "tipo": "Administrador",
        "correo": "correo"
      },
      {
        "id": 2,
        "nombre": "user2",
        "numeroRegistro": "201730159",
        "username": "user2",
        "password": "password",
        "tipo": "Administrador",
        "correo": "correo"
      }
    ];

    service.lista().subscribe((result: User[]) => {
      expect(result.length).toBe(2);
    });
    const request = httpMock.expectOne(`${service.usuarioUrl+"/lista"}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummy);
  });

  it('setDatosTrue', () => {
    var spy = spyOn(service, 'getLoggedInUserRoleAdmin').and.returnValue(true);

    service.setDatosUserLogued(user);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/usuarios']);
  
  });

});


