import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//external toastr
import { ToastrModule } from 'ngx-toastr';
//rating stars component import
import { BarRatingModule } from "ngx-bar-rating";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CatalogoComponent } from './catalogo/catalogo.component';

//componentes angular material
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';   
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component'; 
import { IngresoLibroComponent } from './ingresoLibro/ingresoLibro.component'; 
import { ListaUserComponent } from './user/lista-user.component';
import { NuevoUserComponent } from './user/nuevo-user.component';
import { EditarUserComponent } from './user/editar-user.component';
import {MatSnackBarModule} from '@angular/material/snack-bar'

import { PrestamoLibroComponent } from './prestamo/prestamo-libro.component';
import { ReservaLibroComponent } from './reserva/reserva-libro.component'; 
import { DetalleslibroComponent } from './detalleslibro/detalleslibro.component';
import { RevisionPrestamoComponent } from './prestamos/revision-prestamo/revision-prestamo.component';
import { CategoryCreatorComponent } from './category-creator/category-creator.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditorComponent } from './category-editor/category-editor.component';
import { ListaLibroComponent } from './ingresoLibro/lista-libro.component';
import { DetalleLibroComponent } from './ingresoLibro/detalle-libro.component';
import { EditarLibroComponent } from './ingresoLibro/editar-libro.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { SolicitudResetPasswordComponent } from './user/solicitud-reset-password/solicitud-reset-password.component';
import { RevisionReservacionComponent } from './prestamos/revision-reservacion/revision-reservacion.component';
import { RevisionReservacionVencidaComponent } from './prestamos/revision-reservacion-vencida/revision-reservacion-vencida.component';
import { SetDatosBibliotecaComponent } from './set-datos-biblioteca/set-datos-biblioteca.component';
import { ReportePrestamosComponent } from './reportes/reporte-prestamos/reporte-prestamos.component';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component'; 

// Importar animaciones, los botones, el diálogo y el componente
import { MatDialogModule } from '@angular/material/dialog';
import { ReporteAlumnosMorososComponent } from './reportes/reporte-alumnos-morosos/reporte-alumnos-morosos.component';
import { IdentificarLibroComponent } from './prestamo-presencial/identificar-libro/identificar-libro.component';
import { FormularioPrestamoComponent } from './prestamo-presencial/formulario-prestamo/formulario-prestamo.component';
import { RevisionBitacoraComponent } from './prestamos/revision-bitacora/revision-bitacora.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { CancelarReservacionComponent } from './cancelar-reservacion/cancelar-reservacion.component';


@NgModule({
  declarations: [
    AppComponent,
    CatalogoComponent,
    IngresoLibroComponent,
    LoginComponent,
    IndexComponent,
    ListaUserComponent,
    NuevoUserComponent,
    EditarUserComponent,
    DetalleslibroComponent,
    PrestamoLibroComponent,
    ReservaLibroComponent,
    RevisionPrestamoComponent,
    CategoryCreatorComponent,
    CategoryListComponent,
    CategoryEditorComponent,
    ListaLibroComponent,
    DetalleLibroComponent,
    EditarLibroComponent,
    ResetPasswordComponent,
    SolicitudResetPasswordComponent,
    RevisionReservacionComponent,
    RevisionReservacionVencidaComponent,
    SetDatosBibliotecaComponent,
    ReportePrestamosComponent,
    DialogoConfirmacionComponent,
    ReporteAlumnosMorososComponent,
    IdentificarLibroComponent,
    FormularioPrestamoComponent,
    StarRatingComponent,
    RevisionBitacoraComponent,
    CancelarReservacionComponent
  ],
  imports: [
    MatSliderModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    MatExpansionModule,
    MatListModule,
    MatTableModule,
    BarRatingModule,
    MatGridListModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    ToastrModule.forRoot(), // ToastrModule added
    MatDialogModule //confirm-dialog

  ],
  providers: [
    CookieService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpInterceptorServiceService,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogoConfirmacionComponent// confirm-dialog
  ]
})
export class AppModule { }
