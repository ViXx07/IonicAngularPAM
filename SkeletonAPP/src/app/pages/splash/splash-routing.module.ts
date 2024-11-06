import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashPage } from './splash.page';
import { LoginPage } from '../login/login.page';


const routes: Routes = [
  {
    path: '',
    component: SplashPage
  },
  {
    path: 'login',
    component: LoginPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplashPageRoutingModule {}
