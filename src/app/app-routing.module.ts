import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent} from './index/index.component';
import { LoginComponent} from './auth/login.component';
import { RegistroComponent} from './auth/registro.component';
import { CatalogoComponent} from './catalogo/catalogo.component';

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
    component: RegistroComponent
  },
  {
    path: 'catalogo',
    component: CatalogoComponent
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
