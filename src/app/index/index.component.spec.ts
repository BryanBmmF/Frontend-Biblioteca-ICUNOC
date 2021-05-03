import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndexComponent } from './index.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../service/users/users.service';
import { CookieService } from 'ngx-cookie-service';
import { CategoryService } from '../service/category.service';
import { HttpClient } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, NgForm } from '@angular/forms';
import { Categoria } from '../models/categoria';
import { of, throwError } from 'rxjs';
import { AsignacionLibroService } from '../service/asignacion_libro/asignacion-libro.service';
import { Libro } from '../models/libro';
import { LibrosService } from '../service/libros/libros.service';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let usersService: UsersService;
  let categoriaService = {
    lista: () => {return {subscribe: () => {} } },
    save: (category) => {return {subscribe: () => {} }},
    detailId: (id) =>{return {subscribe: () => {} }},
    update: (id,category) => {return {subscribe: () => {} }},
    delete: (id) => {return {subscribe: () => {} }}
  }
  let libroService = {
    lista: () => {return {subscribe: () => {} } },
    detalle: (id) => {return {subscribe: () => {} }},
    detalleCodigo: (id) =>{return {subscribe: () => {} }},
    save: (category) => {return {subscribe: () => {} }},
    update: (id,category) => {return {subscribe: () => {} }},
    delete: (id) => {return {subscribe: () => {} }},
    busquedaFiltrada: (id) => {return {subscribe: () => {} }}
  }
  let asignacionLibroService = {
    lista: () => {return {subscribe: () => {} } },
    listaCategorias: (id) => {return {subscribe: () => {} } },
    listaLibrosCategoria: (id) => {return {subscribe: () => {} } },
    save: (category) => {return {subscribe: () => {} }},
    detailId: (id) =>{return {subscribe: () => {} }},
    update: (id,category) => {return {subscribe: () => {} }},
    delete: (id) => {return {subscribe: () => {} }},
    deleteAssignations: (id) => {return {subscribe: () => {} }},
  }
  let cookieServiceMock = {
    get: ():string => {return 'TEST'},
    check: ():boolean => {return true},
    delete: () => {}
  }
  const spyRouter = {
    navigate: jasmine.createSpy('navigate'),
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };
  let toastrServiceMock = {
    info: (message?: string, title?: string, override?: any) =>{return {}},
    error: (message?: string, title?: string, override?: any) =>{return {error: {mensaje: 'test'}}},
    success: (message?: string, title?: string, override?: any) =>{return {}},
    warning: (message?: string, title?: string, override?: any) =>{return {}},
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        MatMenuModule,
        FormsModule],
      declarations: [ IndexComponent ],
      providers: [
        {
          provide: Router,
          useValue: spyRouter
        },
        {
          provide: ToastrService,
          useValue: toastrServiceMock,
        },
        {
          provide: CookieService,
          useValue: cookieServiceMock
        },
      ]
    })
    .compileComponents();
    TestBed.overrideProvider(CategoryService,{useValue: categoriaService})
    TestBed.overrideProvider(AsignacionLibroService,{useValue: asignacionLibroService})
    TestBed.overrideProvider(LibrosService,{useValue: libroService})
    usersService = new UsersService(
      TestBed.inject(HttpClient),
      TestBed.inject(CookieService),
      TestBed.inject(Router),
    )
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    var store = {};
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all categories', () => {
    //arrange
    let categorias: Categoria[] = []
    categorias.push(new Categoria('test1','desctest1')); categorias.push(new Categoria('test2','desctest2')); categorias.push(new Categoria('test3','desctest3'))
    spyOn(categoriaService,'lista').and.returnValue(of(categorias))
    //act
    component.ngOnInit()
    //assert
    expect(categoriaService.lista).toHaveBeenCalled()
  });

  it('should not get all categories', () => {
    //arrange
    spyOn(categoriaService,'lista').and.returnValue(throwError({status: 404,error: {mensaje: 'test'}}))
    //act
    component.ngOnInit()
    //assert
    expect(categoriaService.lista).toHaveBeenCalled()
  });

});
