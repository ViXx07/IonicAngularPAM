import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/authGuard/auth.guard';
import { noAuthGuard } from './services/noAuthGuard/no-auth.guard';

const routes: Routes = [
  {
    path: 'home', //Cliente
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    title: 'QuéOpinas?',
    canActivate: [AuthGuard],
  },
  {
    path: 'login', //Todos
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    title: 'QuéOpinas?',
    canActivate: [noAuthGuard],
  },
  {
    path: '', //Todos
    loadChildren: () =>
      import('./pages/splash/splash.module').then((m) => m.SplashPageModule),
    title: 'QuéOpinas?',
  },
  {
    path: 'opina', //Cliente
    loadChildren: () =>
      import('./pages/opina/opina.module').then((m) => m.OpinaPageModule),
    title: 'QuéOpinas?',
    canActivate: [AuthGuard],
  },
  {
    path: 'admin', //Admin sistema
    loadChildren: () =>
      import('./pages/admin-sistema/admin-sistema.module').then(
        (m) => m.AdminSysPageModule
      ),
    title: 'QuéOpinas?',
    canActivate: [AuthGuard],
  },
  {
    path: 'codigo', //Cliente
    loadChildren: () =>
      import('./pages/codigo-encuesta/codigo-encuesta.module').then(
        (m) => m.CodigoEncuestaPageModule
      ),
    title: 'QuéOpinas?',
    canActivate: [AuthGuard],
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contacto/contacto.module').then( m => m.ContactoPageModule),
    title: 'QueOpinas?',
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-empresa',
    loadChildren: () => import('./pages/admin-empresa/admin-empresa.module').then( m => m.AdminEmpresaPageModule),
    title: 'QueOpinas?',
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule),
    title: 'QueOpinas?',
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
