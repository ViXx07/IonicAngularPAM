import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminSistemaPage } from './admin-sistema.page';

const routes: Routes = [
  {
    path: '',
    component: AdminSistemaPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSysPageRoutingModule {}
