import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { CookieService } from "ngx-cookie-service";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //constructor con httpClient para peticiones http, y cookiesService para almacenamiento de tokens de respuesta
  constructor(private http: HttpClient, private cookies: CookieService) {}
  
  //Url del servidor backend
  Url = "http://localhost:8082";
  
  /**Metodo Login para autenticacion basica http
   * @param username
   * @param password
   * @returns response server /authorize
   */
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders()
      .append('Authorization', `Basic ${btoa(username + ':' + password)}`)
      .append('X-Requested-With', 'XMLHttpRequest');
    return this.http.post(this.Url+"/authorize", null, { headers: headers });
  }

  /**Metodos para manejo de los tokens de autenticacion
   * SetToken: para setear el token
   * getToken: para obtener el token
   */
   setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }
  getUser() {
    return this.http.get("https://reqres.in/api/users/2");
  }
  getUserLogged() {
    const token = this.getToken();
    // Aquí iría el endpoint para devolver el usuario para un token
  }
  logout(){
    //borramos las cookies
    this.cookies.delete("token");
  }

  /**Metodo para el manejo del Crud de usuarios */
  
  /**Metodo para listar usuarios
   * @returns lista de usuarios
   */
  getUsuarios(){
    return this.http.get<User[]>(this.Url+"/usuarios");

  }

  /**Metodo Register
   * @param user
   * @returns response server /register
   */
   register(user: User) {
    return this.http.post<User>(this.Url+"/usuarios", user);
  }

  
}

