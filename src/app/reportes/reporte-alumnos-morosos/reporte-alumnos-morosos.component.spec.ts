import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersService } from 'src/app/service/users/users.service';

import { ReporteAlumnosMorososComponent } from './reporte-alumnos-morosos.component';

class UsersServiceMock{
  //Mockeo los metodos que necesite en el component y que en teoria me va proveer el UserService
  //solo los que necesito
  getLoggedInUserRoleAdmin = jasmine.createSpy('getLoggedInUserRoleAdmin');
  getLoggedInUserRoleBibliotecario = jasmine.createSpy('getLoggedInUserRoleBibliotecario');
  logout = jasmine.createSpy('logout');
}


describe('ReporteAlumnosMorososComponent', () => {
  let component: ReporteAlumnosMorososComponent;
  let fixture: ComponentFixture<ReporteAlumnosMorososComponent>;
  let userServiceMock: UsersServiceMock;

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
      declarations: [ ReporteAlumnosMorososComponent ],
            //los mock que creamos
            providers: [
              HttpClient,
              ReporteAlumnosMorososComponent,
              {
                provide: UsersService,
                useClass: UsersServiceMock,
              },
              {
                provide: Router,
                useValue: spyRouter,
              },
            ]
    })
    component = TestBed.get(ReporteAlumnosMorososComponent);
    userServiceMock = TestBed.get(UsersService);
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
