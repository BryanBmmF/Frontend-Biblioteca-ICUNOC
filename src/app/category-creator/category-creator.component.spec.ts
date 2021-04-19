import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CategoryCreatorComponent } from './category-creator.component';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../service/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../service/category.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";
import { MatMenuModule } from '@angular/material/menu';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
class MatDialogMock{
  open = jasmine.createSpy('open');
}
describe('CategoryCreatorComponent', () => {
  let component: CategoryCreatorComponent;
  let fixture: ComponentFixture<CategoryCreatorComponent>;
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
      imports: [
        HttpClientTestingModule,
        MatMenuModule,
        FormsModule
      ],
      declarations: [ CategoryCreatorComponent ],
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
    fixture = TestBed.createComponent(CategoryCreatorComponent);
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

  it('should run method onCreate',() => {
    //arrange
    let form: NgForm
    component.nombre = 'test1'
    component.descripcion = 'desctest1'
    
    spyOn(categoriaService,'save').and.returnValue(of(true))
    matDialogMock.open.and.returnValue({afterClosed:() => of(true)})
    spyOn(toastrServiceMock,'success').and.callThrough()
    //act
    component.onCreate(form)
    //assert
    expect(categoriaService.save).toHaveBeenCalled()
    expect(spyRouter.navigateByUrl).toHaveBeenCalledWith('/listaCategoriasAdmin');
  })

  it('should run method onCreate and throw an error',() => {
    //arrange
    let form: NgForm
    component.nombre = 'test1'
    component.descripcion = 'desctest1'
    const err = () => {}
    spyOn(categoriaService,'save').and.returnValue(throwError({status: 404}))
    matDialogMock.open.and.returnValue({afterClosed:() => of(true)})
    spyOn(toastrServiceMock,'error').and.stub()
    //act
    component.onCreate(form)
    //assert
    expect(categoriaService.save).toHaveBeenCalled()
    expect(spyRouter.navigateByUrl).toHaveBeenCalledWith('/crear-categoria');
  })

  it('should logout', () => {
    //Arrage

    //Act
    component.logout();

    //Spect
    expect(spyRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
