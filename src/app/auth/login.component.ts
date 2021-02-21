import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from '../models/login-usuario';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //variables para comprobar login
  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  usuario: string;
  password: string;
  roles: string[]=[];
  errMsj: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) { 
    
  }

  ngOnInit(): void {
    //comprobar si esta logeado por medio del token
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void{
    this.loginUsuario = new LoginUsuario(this.usuario,this.password);
    //enviar al AuthService y setear el token
    this.authService.login(this.loginUsuario).subscribe(
      data =>{
        this.isLogged = true;
        this.isLoginFail = false;

        //seteo del token
        this.tokenService.setToken(data.token)
        //almacenamiento en el sessionStorage los siguientes datos
        this.tokenService.setUserName(data.usuario);
        //con esta instruccion almacenamos en el navegador
        this.tokenService.setAuthorities(data.authorities);
        //con esta instruccion lo pasamos a la variale roles
        this.roles = data.authorities;
        //redirigir al index
        this.router.navigate(['/']);
      },
      //en caso de un error
      err =>{
        this.isLogged = false;
        this.isLoginFail = true;
        this.errMsj = err.error.message;
        //console.log(err.error.message);
      }
      
    );
  }

}
