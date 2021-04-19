import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryListComponent } from './category-list.component';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Data, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { CategoryService } from '../service/category.service'
import { UsersService } from '../service/users/users.service'
import { ToastrService } from 'ngx-toastr';
import { MatDialog} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { Categoria } from '../models/categoria';
class MatDialogMock{
  open = jasmine.createSpy('open');
}
describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;
  let categoriaService = {
    lista: () => {return {subscribe: () => {} } },
    save: (category) => {return {subscribe: () => {} }},
    detailId: (id) =>{return {subscribe: () => {} }},
    update: (id,category) => {return {subscribe: () => {} }},
    delete: (id) => {return {subscribe: () => {} }}
  }
  let usersService: UsersService;
  

  let matDialogMock: MatDialogMock;
  const spyRouter = {
    navigate: jasmine.createSpy('navigate'),
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };
  let cookieServiceMock = {
    get: ():string => {return 'TEST'},
    check: ():boolean => {return true},
    delete: () => {}
  }
  let toastrServiceMock = {
    info: (message?: string, title?: string, override?: any) =>{},
    error: (message?: string, title?: string, override?: any) =>{}

  }
  beforeEach(async () => {
    spyOn(cookieServiceMock, 'get').and.returnValue('TEST')
    spyOn(cookieServiceMock, 'check').and.returnValue(true)
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatMenuModule
      ],
      declarations: [ CategoryListComponent ],
      providers: [
        {
          provide: ToastrService,
          useValue: toastrServiceMock,
        },
        HttpClient,
        {
          provide: CookieService,
          useValue: cookieServiceMock
        },
        {
          provide: Router,
          useValue: spyRouter
        },
        {
          provide: MatDialog,
          useClass: MatDialogMock,
        },
      ]
    })
    .compileComponents();
    TestBed.overrideProvider(CategoryService,{useValue: categoriaService})
    
    usersService = new UsersService(
      TestBed.inject(HttpClient),
      TestBed.inject(CookieService),
      TestBed.inject(Router),
    )

    
  });
  

  beforeEach(() => {
    matDialogMock = TestBed.get(MatDialog)
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate menu', () => {
    //arrange
    component.buttonUsers = false
    //act
    component.validarMenu()
    //assert
    expect(component.buttonUsers).toBeTrue
  })

  it('should load categories', () => {
    //arrange
      let categorias: Categoria[] = []
      categorias.push(new Categoria('test1','desctest1')); categorias.push(new Categoria('test2','desctest2')); categorias.push(new Categoria('test3','desctest3'))
      
      spyOn(categoriaService,'lista').and.returnValue({ subscribe: () => {} })
    //act
      component.cargarCategorias()
    //assert
      expect(categoriaService.lista).toHaveBeenCalled()
  })

  it('should erase category', () => {
    //arrange
    matDialogMock.open.and.returnValue({afterClosed:() => of(true)})
    spyOn(categoriaService,'delete').and.returnValue({ subscribe: () => {} })
    spyOn(component,'cargarCategorias').and.stub
    //act
    component.borrar(1)
    //assert
    expect(categoriaService.delete).toHaveBeenCalled()
  })

  it('should logout', () => {
    //Arrage

    //Act
    component.logout();

    //Spect
    expect(spyRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
