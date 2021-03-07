import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent} from './index/index.component';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { CatalogoComponent} from './catalogo/catalogo.component';
import { IngresoLibroComponent} from './ingresoLibro/ingresoLibro.component';

/**
 * Manejo de las diferentes rutas de la pagina
 */
const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegisterComponent
  },
  {
    path: 'catalogo',
    component: CatalogoComponent
  },
  {
    path: 'ingreso',
    component: IngresoLibroComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
