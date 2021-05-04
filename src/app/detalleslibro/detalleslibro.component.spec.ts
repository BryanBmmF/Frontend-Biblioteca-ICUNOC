import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleslibroComponent } from './detalleslibro.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersService } from '../service/users/users.service';
import { Libro } from '../models/libro';
import { ComentarioService} from '../service/comentario/comentario.service'
import { ToastrService } from 'ngx-toastr';
import { LibrosService } from '../service/libros/libros.service';
import { NgForm } from '@angular/forms';
import { throwError } from 'rxjs';
import moment from 'moment';
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
  let librosService = {
    getLibroId : (id) => {return {subscribe: () => {} } },
  }
  let commentServiceMock = {
    lista: (id) => {return {subscribe: () => {} } },
    save: (comment) => {return {subscribe: () => {} } }
  }
  let toastrServiceMock = {
    info: (message?: string, title?: string, override?: any) =>{return {}},
    error: (message?: string, title?: string, override?: any) =>{return {error: {mensaje: 'test'}}},
    success: (message?: string, title?: string, override?: any) =>{return {}}
  }
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
          provide: ToastrService,
          useValue: toastrServiceMock,
        },{
          provide: Router,
          useValue: spyRouter,
        },
        {
          provide: ComentarioService,
          useValue: commentServiceMock
        },
        {
          provide: LibrosService,
          useValue: librosService
        }
      ]
    });
    component = TestBed.get(DetalleslibroComponent);
    userServiceMock = TestBed.get(UsersService);
  }
  
  );
  

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
    spyOn(librosService,'getLibroId').and.returnValue({subscribe: () => {} })
    spyOn(commentServiceMock,'lista').and.returnValue({subscribe: () => {} })
    //Act
    component.ngOnInit();
    //assert
  });

  it('should translate date', () => {
      //arrange
      
      //act
      const result = component.translateDate("2020-12-12")
      //assert
      expect(result).toBe(moment("2020-12-12").locale('es-mx').format('LL'))
  })

  it('should pad the date', () => {
    //arrange
    //act
    const result = component.pad(5)
    const result2 = component.pad(10)
    //assert
    expect(result).toBe("05")
    expect(result2).toBe(10)
  })

  it('should create a comment',() => {
    //arrange
    let form: NgForm
    spyOn(commentServiceMock,'save').and.returnValue({subscribe: () => {} })
    spyOn(toastrServiceMock,'success').and.callThrough()
    //act
    component.onCreate(form)
    //assert
    expect(commentServiceMock.save).toHaveBeenCalled()

  })

  it('should run method onCreate and throw an error',() => {
    //arrange
    let form: NgForm
    spyOn(commentServiceMock,'save').and.returnValue(throwError({status: 404}))
    spyOn(toastrServiceMock,'error').and.stub()
    //act
    component.onCreate(form)
    //assert
    expect(commentServiceMock.save).toHaveBeenCalled()
  })


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
