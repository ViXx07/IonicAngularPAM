import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordarContrasenaPage } from './recordar-contrasena.page';

const routes: Routes = [
  {
    path: '',
    component: RecordarContrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordarContrasenaPageRoutingModule {}
