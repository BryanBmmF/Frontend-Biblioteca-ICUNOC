import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent} from './index/index.component';
import { LoginComponent } from "./login/login.component";
import { CatalogoComponent} from './catalogo/catalogo.component';
import { IngresoLibroComponent} from './ingresoLibro/ingresoLibro.component';
import { ListaUserComponent } from './user/lista-user.component';
import { DetalleUserComponent } from './user/detalle-user.component';
import { NuevoUserComponent } from './user/nuevo-user.component';
import { EditarUserComponent } from './user/editar-user.component';
import { DetalleslibroComponent } from './detalleslibro/detalleslibro.component';
import { RegistrarDevolucionComponent } from './devoluciones/registrar-devolucion/registrar-devolucion.component';
import { RevisionPrestamoComponent } from './prestamos/revision-prestamo/revision-prestamo.component';

/**
 * Manejo de las diferentes rutas de la pagina
 */
const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'detalleslibro', component: DetalleslibroComponent },
  { path: 'usuarios', component: ListaUserComponent },
  { path: 'registro-usuario', component: NuevoUserComponent },
  { path: 'detalle/:id', component: DetalleUserComponent },
  { path: 'editar-usuario/:id', component: EditarUserComponent },
  { path: 'ingresoLibro', component: IngresoLibroComponent },
  { path: 'registrarDevolucion', component: RegistrarDevolucionComponent },
  { path: 'registrarPrestamo', component: RevisionPrestamoComponent },
  //cualquier otro path inexistente, redireccionar a index va de ultimo siempre
  { path: '**', redirectTo:'', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
