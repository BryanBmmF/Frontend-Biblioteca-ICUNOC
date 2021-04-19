import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDatosBibliotecaComponent } from './set-datos-biblioteca.component';

import infoBiblioteca from 'src/app/test/fileTest/infoBiblioteca.json';
import infoBibliotecaTestFail from 'src/app/test/fileTest/infoBibliotecaTestFail.json';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../service/users/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

class UsersServiceMock{
  getLoggedInUserRoleAdmin = jasmine.createSpy('getLoggedInUserRoleAdmin');
  logout = jasmine.createSpy('logout');
  updateInfoBiblioteca = jasmine.createSpy('updateInfoBiblioteca');
  detailIdInfoBiblioteca = jasmine.createSpy('detailIdInfoBiblioteca');
}

class ToastrServiceMock{
  success = jasmine.createSpy('success');
  warning = jasmine.createSpy('warning');
  error = jasmine.createSpy('error');
}

class MatDialogMock{
  open = jasmine.createSpy('open');
}

describe('SetDatosBibliotecaComponent', () => {
  let component: SetDatosBibliotecaComponent;
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
      declarations: [ SetDatosBibliotecaComponent ],
      providers: [
        HttpClient,
        SetDatosBibliotecaComponent,
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
          provide: MatDialog,
          useClass: MatDialogMock,
        },

      ]
    });
    //inject de los mock para hacer referencia a los reales
    component = TestBed.get(SetDatosBibliotecaComponent);
    toastrMock = TestBed.get(ToastrService);
    matDialogMock = TestBed.get(MatDialog);
    userServiceMock = TestBed.get(UsersService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit confirm User Logged Admin and load infoBiblioteca', () => {
    //Arrage
    userServiceMock.getLoggedInUserRoleAdmin.and.returnValue(true);

    userServiceMock.detailIdInfoBiblioteca.and.returnValue(of(1));

    //Act
    component.ngOnInit();

    //Expect infoBiblioteca initilizer
    expect(component.infoBiblioteca).toBeTruthy();
  });

  it('should ngOnInit confirm User Logged Admin and load infoBiblioteca Error', () => {
    //Arrage
    userServiceMock.getLoggedInUserRoleAdmin.and.returnValue(true);

    userServiceMock.detailIdInfoBiblioteca.and.returnValue(throwError({ status: 404, error: "error" }));

    //Act
    component.ngOnInit();

    //Expect infoBiblioteca not initilizer
    expect(component.infoBiblioteca).toEqual(null);
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
    component.infoBiblioteca = infoBiblioteca;
    //se confirma el dialog
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) });

    //enviamos un user real
    //userServiceMock.update.withArgs(1, user).and.returnValue("update");
    userServiceMock.updateInfoBiblioteca.and.returnValue(of(1, component.infoBiblioteca));

    //Act
    component.onUpdate();

    //Spect
    expect(component.infoBiblioteca).toEqual(infoBiblioteca);
    expect(spyRouter.navigate).toHaveBeenCalledWith(['/info-biblioteca']);
  });

  it('should onUpdate with Error', () => {
    //Arrage
    component.infoBiblioteca = infoBiblioteca;
    //se confirma el dialog
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) });

    //provocamos el error
    userServiceMock.updateInfoBiblioteca.and.returnValue(throwError({ status: 404, error: "error" }));

    //Act
    component.onUpdate();

    //Spect
    expect(spyRouter.navigate).toHaveBeenCalledWith(['/info-biblioteca']);
  });

  it('should onUpdate parameters NaN', () => {
    //Arrage
    component.infoBiblioteca = infoBibliotecaTestFail;
    //component.infoBiblioteca.diasHabilesPrestamo =null;
    //se confirma el dialog
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) });

    //enviamos un user real
    //userServiceMock.update.withArgs(1, user).and.returnValue("update");
    userServiceMock.updateInfoBiblioteca.and.returnValue(of(1, component.infoBiblioteca));

    //Act
    component.onUpdate();

    //Spect
    expect(component.infoBiblioteca).toEqual(infoBibliotecaTestFail);
    //expect(spyRouter.navigate).toHaveBeenCalledWith(['/info-biblioteca']);
  });

  it('should onUpdate not confirm', () => {
    //Arrage
    component.infoBiblioteca = infoBiblioteca;
    //se confirma el dialog
    matDialogMock.open.and.returnValue({ afterClosed: () => of(false) });

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
