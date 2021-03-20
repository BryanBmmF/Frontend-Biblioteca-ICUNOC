import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { User } from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //Url de la api en el servidor backend
  Url = "http://localhost:8082/api/v1";

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  //Url del servidor backend api rest usuarios
  usuarioUrl = "http://localhost:8082/api/v1/admin/usuarios";

  auth: boolean = true;

  //constructor con httpClient para peticiones http, y cookiesService para almacenamiento de tokens de respuesta
  constructor(private http: HttpClient, private cookies: CookieService) { }

  /**Metodo Login para autenticacion basica http
   * @param username
   * @param password
   * @returns response server /authorize
   */
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders()
      .append('Authorization', `Basic ${btoa(username + ':' + password)}`)
      .append('X-Requested-With', 'XMLHttpRequest');
    return this.http.post(this.Url + "/authorize", null, { headers: headers });
  }

  /**Metodos para manejo de los tokens de autenticacion
   * SetToken: para setear el token, y el usuario en la sesion
   * getToken: para obtener el token
   */
  setTokenAndUser(token: string, username: string) {
    this.cookies.set("token", token);
    //guardamos el usuario logueado en la sesion
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
  }
  getToken() {
    return this.cookies.get("token");
  }
  getUser() {
    return this.http.get("https://reqres.in/api/users/2");
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null){
      return false;
    } 
    return true;
  }
  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) {
      return '';
    }
    return user;
  }

  //validar acceso Admin
  getAdminLogged(): Observable<any> {
    const headers = new HttpHeaders()
      .append('authToken', this.getToken())
      .append('X-Requested-With', 'XMLHttpRequest');
    return this.http.get(this.Url + "/permissionAdmin", { headers: headers });
  }

  //validar acceso User
  getUserLogged(): Observable<any> {
    const headers = new HttpHeaders()
      .append('authToken', this.getToken())
      .append('X-Requested-With', 'XMLHttpRequest');
    return this.http.get(this.Url + "/permissionUser", { headers: headers });
  }

  logout() {
    //borramos el tohen de las cookies
    this.cookies.delete("token");
    //borramos el usaurio logueado de la sesion
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  /**Metodo para el manejo del Crud de usuarios */

  /**Metodo para listar usuarios
   * @returns lista de usuarios
   */
  getUsuarios() {
    return this.http.get<User[]>(this.Url + "/api/v1/usuarios");

  }

  /**Metodo Register
   * @param user
   * @returns response server /register
   */
  register(user: User) {
    return this.http.post<User>(this.Url + "/api/v1/usuarios", user);
  }

  //metodo para listar usuarios
  public lista(): Observable<User[]> {
    return this.http.get<User[]>(this.usuarioUrl + "/lista");
  }

  //metodos para devolver un usuario
  //IMPORTANTE: si lleva parametros usar ``  sino entonces ''
  //por id
  public detailId(id: number): Observable<User> {
    return this.http.get<User>(this.usuarioUrl + `/detailId/${id}`);
  }

  //por username
  public detailUsername(username: string): Observable<User> {
    return this.http.get<User>(this.usuarioUrl + `/detailUsername/${username}`);
  }

  //guardar
  //IMPORTANTE: cuando llamamaos un post este tiene que llevar RequestBody, sino se especifica colocar {}
  public save(user: User): Observable<any> {
    return this.http.post<any>(this.usuarioUrl + '/create', user);
  }

  //actualizar
  public update(id: number, user: User): Observable<any> {
    return this.http.put<any>(this.usuarioUrl + `/update/${id}`, user);
  }

  //eliminar
  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.usuarioUrl + `/delete/${id}`);
  }

}

