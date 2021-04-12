import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-reporte-prestamos',
  templateUrl: './reporte-prestamos.component.html',
  styleUrls: ['./reporte-prestamos.component.css']
})
export class ReportePrestamosComponent implements OnInit {

  constructor(private router:Router
  ,private userService: UsersService) { }

  ngOnInit(): void {
  }
  logout(){
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }
}
