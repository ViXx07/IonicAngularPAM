import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/guards/authGuard/auth.guard';
import { noAuthGuard } from './services/guards/noAuthGuard/no-auth.guard';
import { clienteGuard } from './services/guards/clienteGuard/cliente-guard.guard';
import { adminSisGuard } from './services/guards/adminSisGuard/admin-sis-guard.guard';
import { adminEmpGuard } from './services/guards/adminEmpGuard/admin-emp-guard.guard';

const routes: Routes = [
  //-------------------------------Cliente-------------------------------//
  {
    path: 'home', 
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    title: 'QuéOpinas?',
    canActivate: [AuthGuard, clienteGuard],
  },
  //----------------------------Admin Empresa----------------------------//
  {
    path: 'admin-empresa', 
    loadChildren: () =>
      import('./pages/admin-empresa/admin-empresa.module').then(
        (m) => m.AdminEmpresaPageModule
      ),
    title: 'QueOpinas?',
    canActivate: [AuthGuard, adminEmpGuard],
  },
  //----------------------------Admin sistema----------------------------//
  {
    path: 'admin', 
    loadChildren: () =>
      import('./pages/admin-sistema/admin-sistema.module').then(
        (m) => m.AdminSistemaPageModule
      ),
    title: 'QuéOpinas?',
    canActivate: [AuthGuard, adminSisGuard],
  },
  //--------------------------------Todos-------------------------------//
  {
    path: '', 
    loadChildren: () =>
      import('./pages/splash/splash.module').then((m) => m.SplashPageModule),
    title: 'QuéOpinas?',
    canActivate: [noAuthGuard],
  },
  //----------------------------Not Found-------------------------------//
  {
    path: '**', 
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundPageModule
      ),
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
