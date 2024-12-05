import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminSistemaPage } from './admin-sistema.page';
import { ContactoPage } from '../contacto/contacto.page';
import { EmpresasComponent } from '../empresas/empresas.component';
import { RegistroEmpresaComponent } from 'src/app/components/registro-empresa/registro-empresa.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSistemaPage,
  },
  {
    path: 'contacto',
    component: ContactoPage,
  },
  {
    path:  'empresas',
    component: EmpresasComponent
  },
  {
    path: 'registroEmpresas',
    component: RegistroEmpresaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSistemaPageRoutingModule {}
