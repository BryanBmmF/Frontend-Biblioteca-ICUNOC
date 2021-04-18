import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, convertToParamMap, Data, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { UsersService } from '../service/users/users.service';

import { EditarUserComponent } from './editar-user.component';

import user from 'src/app/test/fileTest/user.json';

class UsersServiceMock {
  getLoggedInUserRoleAdmin = jasmine.createSpy('getLoggedInUserRoleAdmin');
  logout = jasmine.createSpy('logout');
  update = jasmine.createSpy('update');
  detailId = jasmine.createSpy('detailId');
}

class ToastrServiceMock {
  success = jasmine.createSpy('success');
  warning = jasmine.createSpy('warning');
  error = jasmine.createSpy('error');
}

class MatDialogMock {
  open = jasmine.createSpy('open');
}

describe('EditarUserComponent', () => {
  let component: EditarUserComponent;
  //los mocks que necesita mi component
  let matDialogMock: MatDialogMock;
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
      declarations: [EditarUserComponent],
      //los mock que creamos
      providers: [
        HttpClient,
        EditarUserComponent,
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
        },
        {
          provide: MatDialog,
          useClass: MatDialogMock,
        },

      ]
    });
    //inject de los mock para hacer referencia a los reales
    component = TestBed.get(EditarUserComponent);
    toastrMock = TestBed.get(ToastrService);
    matDialogMock = TestBed.get(MatDialog);
    userServiceMock = TestBed.get(UsersService);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit confirm User Logged Admin and load user', () => {
    //Arrage
    userServiceMock.getLoggedInUserRoleAdmin.and.returnValue(true);

    userServiceMock.detailId.and.returnValue(of(1));

    //Act
    component.ngOnInit();

    //Expect user initilizer
    expect(component.user).toBeTruthy();
  });

  it('should ngOnInit confirm User Logged Admin and load user Error', () => {
    //Arrage
    userServiceMock.getLoggedInUserRoleAdmin.and.returnValue(true);

    userServiceMock.detailId.and.returnValue(throwError({ status: 404, error: "error" }));

    //Act
    component.ngOnInit();

    //Expect user not initilizer
    expect(component.user).toEqual(null);
  });

  it('should ngOnInit NOT confirm User Logged Admin', () => {
    //Arrage
    userServiceMock.getLoggedInUserRoleAdmin.and.returnValue(false);

    //Act
    component.ngOnInit();

    //Expect
    expect(spyRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should onUpdate', () => {
    //Arrage
    component.user = user;
    component.confirmPassword = "password";
    //se confirma el dialog
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) });

    //enviamos un user real
    //userServiceMock.update.withArgs(1, user).and.returnValue("update");
    userServiceMock.update.and.returnValue(of(1, component.user));

    //Act
    component.onUpdate();

    //Spect
    expect(component.user).toEqual(user);
  });

  it('should onUpdate with Error', () => {
    //Arrage
    component.user = user;
    component.confirmPassword = "password";
    //se confirma el dialog
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) });

    //provocamos el error
    userServiceMock.update.and.returnValue(throwError({ status: 404, error: "error" }));

    //Act
    component.onUpdate();

    //Spect
    expect(spyRouter.navigate).toHaveBeenCalledWith(['/usuarios']);
  });

  it('should onUpdate with different password', () => {
    //Arrage
    component.user = user;
    component.confirmPassword = "password2";
    //se confirma el dialog
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) });

    userServiceMock.update.and.returnValue(of(1, component.user));

    //Act
    component.onUpdate();

    //Spect
    //warning toastr
  });

  it('should onUpdate not confirm', () => {
    //Arrage
    component.user = user;
    component.confirmPassword = "password";
    //se confirma el dialog
    matDialogMock.open.and.returnValue({ afterClosed: () => of(false) });

    userServiceMock.update.and.returnValue(of(1, component.user));;

    //Act
    component.onUpdate();

    //Spect
    //continue
  });


  it('should logout', () => {
    //Arrage

    //Act
    component.logout();

    //Spect
    expect(spyRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  });


});
