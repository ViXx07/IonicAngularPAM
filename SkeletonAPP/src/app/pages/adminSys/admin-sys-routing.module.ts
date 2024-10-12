import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminSysPage } from './admin-sys.page';

const routes: Routes = [
  {
    path: '',
    component: AdminSysPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSysPageRoutingModule {}
