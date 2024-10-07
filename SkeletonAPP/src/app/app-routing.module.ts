import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { noAuthGuard } from './services/no-auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    title: 'QuéOpinas?'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    title: 'QuéOpinas?',
    canActivate: [noAuthGuard]
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule),
    title: 'QuéOpinas?'
  },
  {
    path: 'opina',
    loadChildren: () => import('./pages/opina/opina.module').then( m => m.OpinaPageModule),
    title: 'QuéOpinas?'
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin-sys/admin-sys.module').then( m => m.AdminSysPageModule),
    title: 'QuéOpinas?',
    canActivate: [AuthGuard]
  },
  {
    path: 'codigo',
    loadChildren: () => import('./pages/codigo-encuesta/codigo-encuesta.module').then( m => m.CodigoEncuestaPageModule),
    title: 'QuéOpinas?'
  },
  {
    path: 'recordar',
    loadChildren: () => import('./pages/recordar-contrasena/recordar-contrasena.module').then( m => m.RecordarContrasenaPageModule),
    title: 'QuéOpinas?'
  },
  {
    path: 'registroAdmin',
    loadChildren: () => import('./pages/registro-admin/registro-admin.module').then( m => m.RegistroAdminPageModule),
    title: 'QuéOpinas?'
  },







];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
