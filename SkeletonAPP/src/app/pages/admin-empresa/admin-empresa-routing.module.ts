import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminEmpresaPage } from './admin-empresa.page';
import { ContactoPage } from '../contacto/contacto.page';
import { GraficoEmpresaComponent } from 'src/app/components/grafico-empresa/grafico-empresa.component';

const routes: Routes = [
  {
    path: '',
    component: AdminEmpresaPage
  },
  {
    path: 'contacto',
    component: ContactoPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminEmpresaPageRoutingModule {}
