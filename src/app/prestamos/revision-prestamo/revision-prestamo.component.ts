import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-revision-prestamo',
  templateUrl: './revision-prestamo.component.html',
  styleUrls: ['./revision-prestamo.component.css']
})
export class RevisionPrestamoComponent implements OnInit {

  constructor(private userService: UsersService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {

  }

  logout() {
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }

}
