import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/service/users/users.service';

import { ResetPasswordComponent } from './reset-password.component';
import user from 'src/app/test/fileTest/user.json';
import { of, throwError } from 'rxjs';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/User';

class UsersServiceMock {
  getLoggedInUserRoleAdmin = jasmine.createSpy('getLoggedInUserRoleAdmin');
  login = jasmine.createSpy('login');
  detailUsername = jasmine.createSpy('detailUsername');
  update = jasmine.createSpy('update');
}

class ToastrServiceMock {
  success = jasmine.createSpy('success');
  warning = jasmine.createSpy('warning');
  error = jasmine.createSpy('error');
  info = jasmine.createSpy('info');
}

class MatDialogMock {
  open = jasmine.createSpy('open');
}

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
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
      declarations: [ResetPasswordComponent],
      providers: [
        HttpClient,
        ResetPasswordComponent,
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
    component = TestBed.get(ResetPasswordComponent);
    toastrMock = TestBed.get(ToastrService);
    matDialogMock = TestBed.get(MatDialog);
    userServiceMock = TestBed.get(UsersService);

    //ya que el init no tiene nada de una lo probamos
    component.ngOnInit();
      
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onUpdate', () => {
    //Arrage
    component.user = user;
    component.confirmNuevoPassword = "password";
    component.username = "user1";
    component.passwordActual = "password";
    component.nuevoPassword = "password";
    component.confirmNuevoPassword = "password";

    //consulta del username existente que retorne un user
    userServiceMock.detailUsername.and.returnValue(of(component.user));
    //se confirma el dialog
    matDialogMock.open.and.returnValue({afterClosed: () => of(true)}); 

    //usamos el login
    userServiceMock.login.and.returnValue(of(component.user, component.passwordActual));

    //enviamos un user real
    //userServiceMock.update.withArgs(1, user).and.returnValue("update");
    userServiceMock.update.and.returnValue(of(1, component.user));

    let form : NgForm;

    //Act
    component.onCreate(form);
    
    //Spect
    expect(component.user).toEqual(user);
  });

  it('should onUpdate with error ', () => {
    //Arrage
    component.user = user;
    component.confirmNuevoPassword = "password";
    component.username = "user1";
    component.passwordActual = "password";
    component.nuevoPassword = "password";
    component.confirmNuevoPassword = "password";

    //consulta del username existente que retorne un user
    userServiceMock.detailUsername.and.returnValue(of(component.user));
    //se confirma el dialog
    matDialogMock.open.and.returnValue({afterClosed: () => of(true)}); 

    //usamos el login
    userServiceMock.login.and.returnValue(of(component.user, component.passwordActual));

    //provocamos el error
    userServiceMock.update.and.returnValue(throwError({ status: 404 , error: "error" }));

    let form : NgForm;

    //Act
    component.onCreate(form);
    
    //Spect
    expect(component.user).toEqual(user);
  });

  it('should onUpdate with different password ', () => {
    //Arrage
    component.user = user;
    component.confirmNuevoPassword = "password";
    component.username = "user1";
    component.passwordActual = "password";
    //cambiamos los password para provocar el fallo
    component.nuevoPassword = "password";
    component.confirmNuevoPassword = "password2";

    //consulta del username existente que retorne un user
    userServiceMock.detailUsername.and.returnValue(of(component.user));
    //se confirma el dialog
    matDialogMock.open.and.returnValue({afterClosed: () => of(true)}); 

    //usamos el login
    userServiceMock.login.and.returnValue(of(component.user, component.passwordActual));

    //Ya no es necesario llamar al update porque ya no se llega a utilizar en esta rama

    let form : NgForm;

    //Act
    component.onCreate(form);
    
    //Spect
    expect(component.user).toEqual(user);
  });

  it('should onUpdate not confirm ', () => {
    //Arrage
    component.user = user;

    //consulta del username existente que retorne un user
    userServiceMock.detailUsername.and.returnValue(of(component.user));
    //No se confirma el dialog
    matDialogMock.open.and.returnValue({afterClosed: () => of(false)}); 
    //Ya no es necesario llamar al login ni al update porque ya no se llega a utilizar en esta rama

    let form : NgForm;

    //Act
    component.onCreate(form);
    
    //Spect
    expect(component.user).toEqual(user);
  });

  it('should onUpdate login fail ', () => {
    //Arrage
    component.user = user;
    
    //consulta del username existente que retorne un user
    userServiceMock.detailUsername.and.returnValue(of(component.user));
    //No se confirma el dialog
    matDialogMock.open.and.returnValue({afterClosed: () => of(true)}); 
    
    //Provocamos fallo en el login
    userServiceMock.login.and.returnValue(throwError({ status: 404 , error: "error" }));

    let form : NgForm;

    //Act
    component.onCreate(form);
    
    //Spect
    expect(component.user).toEqual(user);
  });

  it('should onUpdate detailUsername fail ', () => {
    //Arrage
    component.user = user;
    
    //provocamos el fallo del detailUsername
    userServiceMock.detailUsername.and.returnValue(throwError({ status: 404 , error: "error" }));

    let form : NgForm;

    //Act
    component.onCreate(form);
    
    //Spect
    expect(component.user).toEqual(user);
  });

});
