import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { Categoria } from 'src/app/models/categoria';
import { Libro } from 'src/app/models/libro';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list categories', () => {
    //arrange
    const dummyPosts: Categoria[] = [{
        nombre: 'test1',
        descripcion: 'desctest1'
      },
      {
        nombre: 'test2',
        descripcion: 'desctest2'
      }];
      //act
      service.lista().subscribe(category => {
        expect(category.length).toBe(2);
        expect(category).toEqual(dummyPosts)
      });
      //assert
      const request = httpMock.expectOne('http://localhost:8082/categorias/lista');
      expect(request.request.method).toBe('GET');
      request.flush(dummyPosts);
  })

  it('should save a category', () => {
    //arrange  
    const category = new Categoria('test1','desc1')
    //act
    service.save(category).subscribe(data => {

    })
    //assert
    const request = httpMock.expectOne('http://localhost:8082/categorias/crearCategoria')
    expect(request.request.method).toBe('POST');
  })

  it('should search for a specific category', () => {
    //arrange  
    const category = new Categoria('test1','desc1',1)
    //act
    service.detailId(1).subscribe(data => {

    })
    //assert
    const request = httpMock.expectOne(`http://localhost:8082/categorias/lista/1`)
    expect(request.request.method).toBe('GET');
  })

  it('should update a category', () => {
    //arrange  
    const category = new Categoria('test1','desc1',1)
    //act
    service.update(1,category).subscribe(data => {

    })
    //assert
    const request = httpMock.expectOne('http://localhost:8082/categorias/actualizar/1')
    expect(request.request.method).toBe('PUT');
  })

  it('should delete a category', () => {
    //arrange  
    const categoryId = 1
    //act
    service.delete(categoryId).subscribe(data => {

    })
    //assert
    const request = httpMock.expectOne(`http://localhost:8082/categorias/eliminar/${categoryId}`)
    expect(request.request.method).toBe('DELETE');
  })
  
});

