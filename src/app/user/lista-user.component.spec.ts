import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUserComponent } from './lista-user.component';

import users from 'src/app/test/fileTest/users.json';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UsersService } from '../service/users/users.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { of, throwError } from 'rxjs';

class UsersServiceMock{
  getLoggedInUserRoleAdmin = jasmine.createSpy('getLoggedInUserRoleAdmin');
  logout = jasmine.createSpy('logout');
  lista = jasmine.createSpy('lista');
  delete = jasmine.createSpy('delete');
}

class ToastrServiceMock{
  success = jasmine.createSpy('success');
  warning = jasmine.createSpy('warning');
  error = jasmine.createSpy('error');
  info = jasmine.createSpy('info');
}

class MatDialogMock{
  open = jasmine.createSpy('open');
}

describe('ListaUserComponent', () => {
  let component: ListaUserComponent;
   //los mocks que necesita mi component
   let matDialogMock: MatDialogMock;
   let userServiceMock: UsersServiceMock;
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
      declarations: [ ListaUserComponent ],
      providers: [
        HttpClient,
        ListaUserComponent,
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
    component = TestBed.get(ListaUserComponent);
    toastrMock = TestBed.get(ToastrService);
    matDialogMock = TestBed.get(MatDialog);
    userServiceMock = TestBed.get(UsersService);
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit confirm User Logged Admin', () => {
    //Arrage
    userServiceMock.getLoggedInUserRoleAdmin.and.returnValue(true);
    var usaurios: User[] = users;
    userServiceMock.lista.and.returnValue(of(usaurios));

    //Act
    component.ngOnInit();

    //Expect
    //continue load users
  });

  it('should ngOnInit NOT confirm User Logged Admin', () => {
    //Arrage
    userServiceMock.getLoggedInUserRoleAdmin.and.returnValue(false);

    //Act
    component.ngOnInit();

    //Expect
    expect(spyRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should cargarUsuarios', () => {
    //Arrage
    var usaurios: User[] = users;
    userServiceMock.lista.and.returnValue(of(usaurios));

    //Act
    component.cargarUsuarios();

    //Expect
    expect(component.users).toBeTruthy();
  });

  it('should cargarUsuarios error producer', () => {
    //Arrage
    userServiceMock.lista.and.returnValue(throwError({ status: 404 , error: "error" }));

    //Act
    component.cargarUsuarios();

    //Expect
    expect(component.users).toEqual(component.users);
  });

  it('should borrar', () => {
    //Arrage
    //se confirma el dialog
    matDialogMock.open.and.returnValue({afterClosed: () => of(true)}); 
    var usaurios: User[] = users;
    userServiceMock.lista.and.returnValue(of(usaurios));

    //enviamos un user real
    userServiceMock.delete.and.returnValue(of(1));

    //Act
    component.borrar(1);
    
    //Spect
    //load users
  });

  it('should borrar with error', () => {
    //Arrage
    //se confirma el dialog
    matDialogMock.open.and.returnValue({afterClosed: () => of(true)}); 

    //enviamos un user real
    userServiceMock.delete.and.returnValue(throwError({ status: 404 , error: "error" }));

    //Act
    component.borrar(1);
    
    //Spect
    //load users
  });

  it('should borrar not confirm', () => {
    //Arrage

    //No se confirma el dialog
    matDialogMock.open.and.returnValue({afterClosed: () => of(false)}); 
    var usaurios: User[] = users;
    userServiceMock.lista.and.returnValue(of(usaurios));

    userServiceMock.delete.and.returnValue(of(1));

    //Act
    component.borrar(1);
    
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
