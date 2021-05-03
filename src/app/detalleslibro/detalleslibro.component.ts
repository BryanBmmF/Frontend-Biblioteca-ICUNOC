import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from 'src/app/models/libro';
import { LibrosService } from 'src/app/service/libros/libros.service';
import { UsersService } from '../service/users/users.service';
import { StarRatingComponent } from '../star-rating/star-rating.component'
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ComentarioService } from '../service/comentario/comentario.service'
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from "../dialogo-confirmacion/dialogo-confirmacion.component";
import { Comentario } from '../models/comentario';
import * as moment from 'moment';

@Component({
  selector: 'app-detalleslibro',
  templateUrl: './detalleslibro.component.html',
  styleUrls: ['./detalleslibro.component.css']
})
export class DetalleslibroComponent implements OnInit {

  libroRecivido:Libro;
  bytes: string;
  comentarios = [];

  @Input('rating') rating: number;
  @Input('starCount') starCount: number;
  @Input('starColor') starColor: string;

  identificacion: string;
  nombre: string;
  comentario: string;
  fecha: string;
  puntuacion: number;
  bookId: string;
  

  constructor(private router:Router, private service:LibrosService, private userService: UsersService, private commentService: ComentarioService,public dialogo: MatDialog,private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.rating = 3
    this.starColor = '#AAAAAA'
    this.starCount = 5

    let libroR = localStorage.getItem("idLibro");   
    if (libroR !== null){
      this.service.getLibroId(libroR)
      .subscribe(data=>{
        this.libroRecivido=data;
        this.bookId = data.codigo; 
        this.bytes = 'data:image/jpeg;base64,' + this.libroRecivido.pathImagen;
        this.commentService.lista(this.bookId).subscribe(
          data => {
            this.comentarios = data.sort(function (a, b) {
              if (a.fecha > b.fecha) {
                return -1;
              }
              if (a.fecha < b.fecha) {
                return 1;
              }
              return 0;
            });
          },
          err => {
            console.log(err)
          }
        )
      })
    }
  }

  pad(n) {
    return n<10 ? '0'+n : n
  }

  onCreate(form: NgForm): void {
    const myDate = new Date();
    const dayOfMonth = myDate.getDate();
    const month = myDate.getMonth();
    const year = myDate.getFullYear();
    this.fecha = year + "-" + this.pad(month + 1) + "-" + this.pad(dayOfMonth)
    const comment = new Comentario(this.identificacion,this.nombre,this.comentario,this.fecha,this.puntuacion,this.bookId);
    this.commentService.save(comment).subscribe(
      data => {
        this.toastr.success('Comentario realizado', 'Ok!', {
          timeOut: 5000, positionClass: 'toast-top-center'
        });
        this.nombre = ''
        this.identificacion = ''
        this.puntuacion = null
        this.comentario = ''
        this.comentarios.unshift(comment)
        form.reset()
      },
      err => {
        this.toastr.error('Hubo un error al realizar el comentario, intentalo más tarde', 'Fail!', {
          timeOut: 5000, positionClass: 'toast-top-center'
        });
        console.log(err)
      }
    );



  }

  logout(){
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }

  reservarLibro(libroID){
    //console.log(libroID.idLibro);
    localStorage.setItem("codigoLibro", libroID.codigo);
    localStorage.setItem("nombreLibro", libroID.nombre);
    localStorage.setItem("idLibro", libroID.idLibro);
    this.router.navigate(["prestamo"]);
  }

}
