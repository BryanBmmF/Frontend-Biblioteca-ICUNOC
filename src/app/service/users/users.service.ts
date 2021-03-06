import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //constructor con httpClient
  constructor(private http: HttpClient, private cookies: CookieService) {}
 
  /**Metodo Login
   * @param username
   * @param password
   * @returns response server /authorize
   */
  login(username: string, password: string): Observable<any> {

    const headers = new HttpHeaders()
      .append('Authorization', `Basic ${btoa(username + ':' + password)}`)
      .append('X-Requested-With', 'XMLHttpRequest');
    return this.http.post("http://localhost:8082/authorize", null, { headers: headers });
  }
  
  /*
  login(username: string, password: string): Observable<any> {
    
    const headers = new HttpHeaders()
      .append('Authorization', `Basic ${this.b64EncodeUnicode(username + ':' + password)}`)
      .append('X-Requested-With', 'XMLHttpRequest');
    return this.http.post("http://localhost:8082/authorize", null, { headers: headers });
  }

  b64EncodeUnicode(str: string): string {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(('0x' + p1) as any);
    }));
  }
  */

  /**Metodo Register
   * @param user
   * @returns response server /register
   */
  register(user: any): Observable<any> {
    return this.http.post("https://reqres.in/api/register", user);
  }

  /**Metoidos para manejo de los tokens de autenticacion
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

  
}

