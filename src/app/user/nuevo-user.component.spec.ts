import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { UsersService } from '../service/users/users.service';

import { NuevoUserComponent } from './nuevo-user.component';

import user from 'src/app/test/fileTest/user.json';

class UsersServiceMock{
  //Mockeo los metodos que necesite en el component y que en teoria me va proveer el UserService
  //solo los que necesito
  getLoggedInUserRoleAdmin = jasmine.createSpy('getLoggedInUserRoleAdmin');
  logout = jasmine.createSpy('logout');

  //ESTE METODO SOLO SE DECLARA Y EN CADA ESCENARIO DE  LOS IT SE COMPLETA. SI NO FUERA DEL SIGUIENTE MODO
  //save = jasmine.createSpy('save').and.returnValue(of(user));
  save = jasmine.createSpy('save');

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

describe('NuevoUserComponent', () => {
  //declaro el component real para utilizar sus metodos
  let component: NuevoUserComponent;

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
      declarations: [ NuevoUserComponent ],

      //los mock que creamos
      providers: [
        HttpClient,
        NuevoUserComponent,
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
    component = TestBed.get(NuevoUserComponent);
    toastrMock = TestBed.get(ToastrService);
    matDialogMock = TestBed.get(MatDialog);
    userServiceMock = TestBed.get(UsersService);

    //ya que en el onInit hay logica de una hacemos la prueba
    //component.ngOnInit();
  });
  //**ESTO LO QUITE POR QUE ME DIO CLAVOS */
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(NuevoUserComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit confirm User Logged Admin', () => {
    //Arrage
    userServiceMock.getLoggedInUserRoleAdmin.and.returnValue(true);

    //Act
    component.ngOnInit();

    //Expect
    //continue
  });

  it('should ngOnInit NOT confirm User Logged Admin', () => {
    //Arrage
    userServiceMock.getLoggedInUserRoleAdmin.and.returnValue(false);

    //Act
    component.ngOnInit();

    //Expect
    expect(spyRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should logout', () => {
    //Arrage

    //Act
    component.logout();
    
    //Spect
    expect(spyRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should onCreate', () => {
    //Arrage
    let form : NgForm;
    //se confirma el dialog
    matDialogMock.open.and.returnValue({afterClosed: () => of(true)}); 

    //enviamos un user real
    userServiceMock.save.and.returnValue(of(user));

    //Act
    component.onCreate(form);
    
    //Spect
    expect(spyRouter.navigate).toHaveBeenCalledWith(['/usuarios']);
  });

  it('should onCreate with Error', () => {
    //Arrage
    let form : NgForm; 
    //se confirma el dialog
    matDialogMock.open.and.returnValue({afterClosed: () => of(true)}); 

    //provocamos el error
    userServiceMock.save.and.returnValue(throwError({ status: 404 , error: "error" }));

    //Act
    component.onCreate(form);
    
    //Spect
    expect(spyRouter.navigate).toHaveBeenCalledWith(['/registro-usuario']);
  });

  it('should onCreate with different password', () => {
    //Arrage
    let form : NgForm; 
    //se confirma el dialog
    matDialogMock.open.and.returnValue({afterClosed: () => of(true)}); 

    //cambiamos las contraseñas
    component.password = "pass1";
    component.confirmPassword = "pass2";
    
    userServiceMock.save.and.returnValue(of(user));

    //Act
    component.onCreate(form);
    
    //Spect
    //expect(spyRouter.navigate).toHaveBeenCalledWith(['/registro-usuario']);
  });

  it('should onCreate not confirm', () => {
    //Arrage
    let form : NgForm; 
    //NO confirma el dialog
    matDialogMock.open.and.returnValue({afterClosed: () => of(false)}); 

    userServiceMock.save.and.returnValue(of(user));

    //Act
    component.onCreate(form);
    
    //Spect
    //expect(spyRouter.navigate).toHaveBeenCalledWith(['/registro-usuario']);
  });
});


