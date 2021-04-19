import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../service/users/users.service';

import { LoginComponent } from './login.component';
import user from 'src/app/test/fileTest/user.json';
import { of, throwError } from 'rxjs';

class UsersServiceMock {
  setTokenAndUser = jasmine.createSpy('setTokenAndUser');
  login = jasmine.createSpy('login');
}

class ToastrServiceMock {
  warning = jasmine.createSpy('warning');
}

describe('LoginComponent', () => {
  let component: LoginComponent;
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
      declarations: [ LoginComponent ],
      providers: [
        HttpClient,
        LoginComponent,
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
    component = TestBed.get(LoginComponent);
    toastrMock = TestBed.get(ToastrService);
    userServiceMock = TestBed.get(UsersService);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    //Arrage
    component.user = "user1";
    component.password = "password";
    userServiceMock.login.and.returnValue(of(component.user, component.password));

    userServiceMock.setTokenAndUser.and.returnValue(of("token", component.user));

    //Act
    component.login();

    //Expect
    expect(component.user).toBeTruthy();
  });

  it('should login error', () => {
    //Arrage
    component.user = "user1";
    component.password = "password";
    userServiceMock.login.and.returnValue(throwError({ status: 404 , error: "error" }));

    //Act
    component.login();

    //Expect
    expect(component.user).toBeTruthy();
  });


});
