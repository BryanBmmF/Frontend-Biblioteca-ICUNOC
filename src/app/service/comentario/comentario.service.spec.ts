import { TestBed } from '@angular/core/testing';
import {Comentario} from '../../models/comentario';
import { ComentarioService } from './comentario.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

describe('ComentarioService', () => {
  let service: ComentarioService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ComentarioService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list comments', () => {
    //arrange
    const id = "1"
    //act
    service.lista(id).subscribe(posts => {

    });
    //assert
    const request = httpMock.expectOne(`http://localhost:8082/comentarios/lista/${id}`);
    expect(request.request.method).toBe('GET');
  });

  it('should save a comment', () => {
    //arrange  
    const comment = new Comentario('','','','',1,'')
    //act
    service.save(comment).subscribe(data => {

    })
    //assert
    const request = httpMock.expectOne('http://localhost:8082/comentarios/crearComentario')
    expect(request.request.method).toBe('POST');
  })
});
