import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminEmpresaPage } from './admin-empresa.page';
import { ContactoPage } from '../contacto/contacto.page';

const routes: Routes = [
  {
    path: '',
    component: AdminEmpresaPage
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
export class AdminEmpresaPageRoutingModule {}
