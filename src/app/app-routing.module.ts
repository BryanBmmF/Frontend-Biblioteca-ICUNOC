import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent} from './index/index.component';
import { LoginComponent } from "./login/login.component";
import { CatalogoComponent} from './catalogo/catalogo.component';
import { IngresoLibroComponent} from './ingresoLibro/ingresoLibro.component';
import { ListaLibroComponent} from './ingresoLibro/lista-libro.component';
import { DetalleLibroComponent} from './ingresoLibro/detalle-libro.component';
import { EditarLibroComponent} from './ingresoLibro/editar-libro.component';
import { ListaUserComponent } from './user/lista-user.component';
import { NuevoUserComponent } from './user/nuevo-user.component';
import { EditarUserComponent } from './user/editar-user.component';
import { DetalleslibroComponent } from './detalleslibro/detalleslibro.component';
import { PrestamoLibroComponent } from './prestamo/prestamo-libro.component';
import { ReservaLibroComponent } from './reserva/reserva-libro.component';
import { RevisionPrestamoComponent } from './prestamos/revision-prestamo/revision-prestamo.component';
import { CategoryListComponent } from './category-list/category-list.component'; 
import { CategoryCreatorComponent } from './category-creator/category-creator.component';
import { CategoryEditorComponent } from './category-editor/category-editor.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { SolicitudResetPasswordComponent } from './user/solicitud-reset-password/solicitud-reset-password.component';
import { RevisionReservacionComponent } from './prestamos/revision-reservacion/revision-reservacion.component';
import { RevisionReservacionVencidaComponent } from './prestamos/revision-reservacion-vencida/revision-reservacion-vencida.component';
import { SetDatosBibliotecaComponent } from './set-datos-biblioteca/set-datos-biblioteca.component';
import { ReportePrestamosComponent } from './reportes/reporte-prestamos/reporte-prestamos.component'; 
import { ReporteAlumnosMorososComponent} from './reportes/reporte-alumnos-morosos/reporte-alumnos-morosos.component';
import { FormularioPrestamoComponent } from './prestamo-presencial/formulario-prestamo/formulario-prestamo.component';
import { IdentificarLibroComponent } from './prestamo-presencial/identificar-libro/identificar-libro.component';
import { RevisionBitacoraComponent } from './prestamos/revision-bitacora/revision-bitacora.component';
import { CancelarReservacionComponent } from './cancelar-reservacion/cancelar-reservacion.component';
/**
 * Manejo de las diferentes rutas de la pagina
 */
const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'solicitudes', component: RevisionBitacoraComponent },
  { path: 'detalleslibro', component: DetalleslibroComponent },
  { path: 'usuarios', component: ListaUserComponent },
  { path: 'registro-usuario', component: NuevoUserComponent },
  { path: 'editar-usuario/:id', component: EditarUserComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'solicitud-reset-password', component: SolicitudResetPasswordComponent },
  { path: 'info-biblioteca', component: SetDatosBibliotecaComponent },

  { path: 'ingresoLibro', component: IngresoLibroComponent },
  { path: 'editarLibro/:id', component: EditarLibroComponent },
  { path: 'detalleLibro/:id', component: DetalleLibroComponent },
  { path: 'detalleLibroC/:codigo', component: DetalleLibroComponent },
  { path: 'listaLibro', component: ListaLibroComponent },


  { path: 'prestamo', component: PrestamoLibroComponent },
  { path: 'reservacionConfirmada', component: ReservaLibroComponent },
  { path: 'cancelarReservacion', component: CancelarReservacionComponent },
  { path: 'reportesPrestamo', component: ReportePrestamosComponent },
  { path: 'reporte3', component: ReporteAlumnosMorososComponent },
  { path: 'revisarPrestamos', component: RevisionPrestamoComponent },
  { path: 'revisarReservaciones', component: RevisionReservacionComponent },
  { path: 'revisarReservacionesVencidas', component: RevisionReservacionVencidaComponent },
  { path: 'listaCategoriasAdmin', component: CategoryListComponent },
  { path: 'crear-categoria', component: CategoryCreatorComponent },
  { path: 'actualizarCategoria/:id', component: CategoryEditorComponent },
  { path: 'formularioPrestamo/:codigo', component:FormularioPrestamoComponent },
  { path: 'identificarLibro', component:IdentificarLibroComponent },
  //cualquier otro path inexistente, redireccionar a index va de ultimo siempre
  { path: '**', redirectTo:'', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
