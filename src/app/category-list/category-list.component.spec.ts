import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryListComponent } from './category-list.component';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Data, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { CategoryService } from '../service/category.service'
import { UsersService } from '../service/users/users.service'
import { ToastrService } from 'ngx-toastr';
import { MatMenuModule } from '@angular/material/menu';
describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;
  let categoriaService: CategoryService;
  let usersService: UsersService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
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
        RouterTestingModule,
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
        }
      ]
    })
    .compileComponents();
    
    
    categoriaService = new CategoryService(TestBed.inject(HttpClient))
    usersService = new UsersService(
      TestBed.inject(HttpClient),
      TestBed.inject(CookieService),
      TestBed.inject(Router),
    )
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
