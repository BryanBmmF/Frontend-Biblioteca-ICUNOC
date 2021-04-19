import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../service/category.service';
import { UsersService } from '../service/users/users.service';

import { CategoryEditorComponent } from './category-editor.component';
import { of, throwError } from 'rxjs';
import { Categoria } from '../models/categoria';
class MatDialogMock{
  open = jasmine.createSpy('open');
}
describe('CategoryEditorComponent', () => {
  let component: CategoryEditorComponent;
  let fixture: ComponentFixture<CategoryEditorComponent>;
  let matDialogMock: MatDialogMock;
  let usersService: UsersService;
  let categoriaService = {
    lista: () => {return {subscribe: () => {} } },
    save: (category) => {return {subscribe: () => {} }},
    detailId: (id) =>{return {subscribe: () => {} }},
    update: (id,category) => {return {subscribe: () => {} }},
    delete: (id) => {return {subscribe: () => {} }}
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
    success: (message?: string, title?: string, override?: any) =>{return {}}
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        MatMenuModule,
        FormsModule],
      declarations: [ CategoryEditorComponent ],
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
          provide: MatDialog,
          useClass: MatDialogMock,
        },
        {
          provide: CookieService,
          useValue: cookieServiceMock
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: 13
              }
            }
          }
        }
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
    fixture = TestBed.createComponent(CategoryEditorComponent);
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
    const category = new Categoria('test1','desc1',1)
    spyOn(categoriaService,'detailId').and.returnValue(of(category))
    //act
    component.cargarCategoria()
    //assert
    expect(categoriaService.detailId).toHaveBeenCalled()
  })

  it('shouldnt load categories', () => {
    //arrange
    const category = new Categoria('test1','desc1',1)
    spyOn(categoriaService,'detailId').and.returnValue(throwError({status: 404}))
    spyOn(toastrServiceMock,'error').and.stub()
    //act
    component.cargarCategoria()
    //assert
    expect(categoriaService.detailId).toHaveBeenCalled()
    expect(toastrServiceMock.error).toHaveBeenCalled()
  })

  it('should run onUpdate method', () => {
    //arrange
    const category = new Categoria('test1','desc1',1)
    component.id = 1
    component.category = category
    
    spyOn(categoriaService,'update').and.returnValue(of(true))
    matDialogMock.open.and.returnValue({afterClosed:() => of(true)})
    spyOn(toastrServiceMock,'success').and.callThrough()
    //act
    component.onUpdate()
    //assert
    expect(categoriaService.update).toHaveBeenCalled()
    expect(spyRouter.navigateByUrl).toHaveBeenCalledWith('/listaCategoriasAdmin');
  })

  it('should run onUpdate method with error', () => {
    //arrange
    const category = new Categoria('test1','desc1',1)
    component.id = 1
    component.category = category
    
    spyOn(categoriaService,'update').and.returnValue(throwError({status: 404,error: {mensaje: 'test'}}))
    matDialogMock.open.and.returnValue({afterClosed:() => of(true)})
    spyOn(toastrServiceMock,'error').and.callThrough()
    //act
    component.onUpdate()
    //assert
    expect(categoriaService.update).toHaveBeenCalled()
    expect(spyRouter.navigateByUrl).toHaveBeenCalledWith('/actualizarCategoria');
  })

  it('should logout', () => {
    //Arrage

    //Act
    component.logout();

    //Spect
    expect(spyRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
