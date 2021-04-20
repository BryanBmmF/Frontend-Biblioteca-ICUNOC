import { TestBed } from '@angular/core/testing';

import { AsignacionLibroService} from './asignacion-libro.service';

import {AsignacionLibro} from '../../models/asignacion_libro'
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { Categoria } from 'src/app/models/categoria';
import { Libro } from 'src/app/models/libro';

describe('AsignacionLibroService', () => {
  let service: AsignacionLibroService;

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AsignacionLibroService],
    });
    service = TestBed.inject(AsignacionLibroService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list asignaciones', () => {
    const dummyPosts: AsignacionLibro[] = [{
      id: 1,
      idLibro: 1,
      idCategoria: 1
    },
    {
      id: 2,
      idLibro: 2,
      idCategoria: 2
    }];
    service.lista().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts)
    });

    const request = httpMock.expectOne('http://localhost:8082/asignacionlibros/lista');
    expect(request.request.method).toBe('GET');
    request.flush(dummyPosts);
  });

  it('should list categories', () => {
    const id = 1
    const dummyPosts: Categoria[] = [{
      idCategoria: 1,
      nombre: 'Test1',
      descripcion: 'Descripcion1'
    },
    {
      idCategoria: 2,
      nombre: 'Test2',
      descripcion: 'Descripcion2'
    },];
    service.listaCategorias(id).subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts)
    });

    const request = httpMock.expectOne(`http://localhost:8082/asignacionlibros/categoriasLibro/${id}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPosts);
  });

  it('should list books', () => {
    const id = 1
    const dummyPosts: Libro[] = [{
      autor: 'testautor1',
      codigo: 'test1',
      edicion: 1,
      fechaPublicacion: 'dateTest1',
      idioma: 'INGLES',
      nombre: 'test1',
      pathImagen: 'testimagen1',
      stock: 1,
      idCategoria: 1
    },
    {
      autor: 'testautor2',
      codigo: 'test2',
      edicion: 2,
      fechaPublicacion: 'dateTest2',
      idioma: 'INGLES',
      nombre: 'test2',
      pathImagen: 'testimagen2',
      stock: 2,
      idCategoria: 2
    }];
    service.listaLibrosCategoria(id).subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts)
    });

    const request = httpMock.expectOne(`http://localhost:8082/asignacionlibros/librosCategoria/${id}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPosts);
  });

  it('should save an assignation', () => {
    //arrange  
    const assignation = new AsignacionLibro(0,0,0)
    //act
    service.save(assignation).subscribe(data => {

    })
    //assert
    const request = httpMock.expectOne('http://localhost:8082/asignacionlibros/crearAsignacion')
    expect(request.request.method).toBe('POST');
  })

  it('should search for a specific assignation', () => {
    //arrange  
    const assignation = new AsignacionLibro(0,0,0)
    //act
    service.detailId(1).subscribe(data => {

    })
    //assert
    const request = httpMock.expectOne(`http://localhost:8082/asignacionlibros/lista/1`)
    expect(request.request.method).toBe('GET');
  })

  it('should delete an assignation', () => {
    //arrange  
    const categoryId = 1
    //act
    service.delete(categoryId).subscribe(data => {

    })
    //assert
    const request = httpMock.expectOne(`http://localhost:8082/asignacionlibros/eliminar/${categoryId}`)
    expect(request.request.method).toBe('DELETE');
  })

  it('should delete the categories assignations of a book',() => {
    //arrange  
    const categoryId = 1
    //act
    service.deleteAssignations(categoryId).subscribe(data => {

    })
    //assert
    const request = httpMock.expectOne(`http://localhost:8082/asignacionlibros/eliminarAsignaciones/${categoryId}`)
    expect(request.request.method).toBe('DELETE');
  })
});
