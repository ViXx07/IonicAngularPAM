import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { OpinaPage } from '../opina/opina.page';
import { CodigoEncuestaPage } from '../codigo-encuesta/codigo-encuesta.page';
import { ContactoPage } from '../contacto/contacto.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'opina',
    component: OpinaPage,
  },
  {
    path: 'codigo',
    component: CodigoEncuestaPage,
  },
  {
    path: 'contacto',
    component: ContactoPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
