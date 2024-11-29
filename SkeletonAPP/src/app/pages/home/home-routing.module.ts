import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { OpinaPage } from '../opina/opina.page';
import { CodigoEncuestaPage } from '../codigo-encuesta/codigo-encuesta.page';
import { ContactoPage } from '../contacto/contacto.page';
import { RegistroEmpresaComponent } from 'src/app/components/registro-empresa/registro-empresa.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'codigo',
    component: CodigoEncuestaPage,
  },
  {
    path: 'contacto',
    component: ContactoPage,
  },
  {
    path: 'registroEmpresa',
    component: RegistroEmpresaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
