import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminEmpresaPage } from './admin-empresa.page';

const routes: Routes = [
  {
    path: '',
    component: AdminEmpresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminEmpresaPageRoutingModule {}
