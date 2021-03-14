import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorServiceService implements HttpInterceptor {

  constructor(private userService: UsersService, private http: HttpClient, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //si es authorize que proceda a loguearse en primera instancia, retornamos el request sin validar nada
    if (req.url.indexOf('authorize') != -1) {
      return next.handle(req);
    }
    
    //si es una peticion admin validar que tenga autorizacion
    if (req.url.indexOf('admin') != -1) {
      this.userService.getAdminLogged().subscribe(
        data => {
          console.log(data);
          if (data.message == "NO_AUTORIZADO") {
            this.userService.logout();
            this.router.navigateByUrl('/');
          }
          //si esta autorizado devolvemos el request
          return next.handle(req);
        },
        //en caso de error
        error => {
          console.log(error);
          this.userService.logout();
          this.router.navigateByUrl('/');
        });
    }

    //si es una peticion user validar que tenga autorizacion
    if (req.url.indexOf('user') != -1) {
      this.userService.getUserLogged().subscribe(
        data => {
          console.log(data);
          if (data.message == "NO_AUTORIZADO") {
            this.userService.logout();
            this.router.navigateByUrl('/');
          }
          //si esta autorizado devolvemos el request
          return next.handle(req);
        },
        //en caso de error
        error => {
          console.log(error);
          this.userService.logout();
          this.router.navigateByUrl('/');
        });
    }

    //si es una peticion de accesos publico, solo retornarla
    if (req.url.indexOf('public') != -1) {
      return next.handle(req);
    }

    //en cualquier otro caso retornar a la pantalla de inicio, ahorita no porque falta incluir bien los pats
    return next.handle(req);

  }
}
