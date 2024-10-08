import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodigoEncuestaPage } from './codigo-encuesta.page';

const routes: Routes = [
  {
    path: '',
    component: CodigoEncuestaPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigoEncuestaPageRoutingModule {}
