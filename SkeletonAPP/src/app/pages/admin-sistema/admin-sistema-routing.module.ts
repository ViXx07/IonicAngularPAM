import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminSistemaPage } from './admin-sistema.page';
import { ContactoPage } from '../contacto/contacto.page';

const routes: Routes = [
  {
    path: '',
    component: AdminSistemaPage,
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
export class AdminSysPageRoutingModule {}
