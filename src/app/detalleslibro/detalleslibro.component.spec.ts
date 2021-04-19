import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleslibroComponent } from './detalleslibro.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersService } from '../service/users/users.service';
import { Libro } from '../models/libro';

class UsersServiceMock{
  //Mockeo los metodos que necesite en el component y que en teoria me va proveer el UserService
  //solo los que necesito
  getLoggedInUserRoleAdmin = jasmine.createSpy('getLoggedInUserRoleAdmin');
  logout = jasmine.createSpy('logout');
}

describe('DetalleslibroComponent', () => {
  let component: DetalleslibroComponent;
  let fixture: ComponentFixture<DetalleslibroComponent>;
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
      declarations: [ DetalleslibroComponent ],

      //los mock que creamos
      providers: [
        HttpClient,
        DetalleslibroComponent,
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
        {
          provide: Router,
          useValue: spyRouter,
        },
      ]
    });
    component = TestBed.get(DetalleslibroComponent);
    userServiceMock = TestBed.get(UsersService);
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should logout', () => {
    //Arrage
    //Act
    component.logout();
    //Spect
    expect(spyRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should reservarLibro', () => {
    //Arrage
    let idLibro: string;
    idLibro = "123"
    //Act
    component.reservarLibro(idLibro);
    //Spect
    expect(spyRouter.navigate).toHaveBeenCalledWith(["prestamo"]);
  });

  it('should ngOnInit Libro null', () => {
    //Arrage
    //Act
    component.ngOnInit();
    //Spect
  });

  it('should ngOnInit Libro NOT null', () => {
    //Arrage
    spyOn(window.localStorage, 'getItem').and.callFake(function() {
			return JSON.stringify({"idLibro":"1"});
		});
    let respuesta: Libro;
    //Act
    component.ngOnInit();
    //Spect
  });

});
