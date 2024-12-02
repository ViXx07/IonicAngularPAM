import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminSysPageRoutingModule } from './admin-sistema-routing.module';

import { AdminSistemaPage } from './admin-sistema.page';
import { SharedModule } from '../../components/shared/shared.module';
import { RegistroAdminComponent } from 'src/app/components/registro-admin/registro-admin.component';
import { RegistroEmpresaComponent } from 'src/app/components/registro-empresa/registro-empresa.component';
import { ModificarEmpresaComponent } from 'src/app/components/modificar-empresa/modificar-empresa.component';
import { ModificarAdminComponent } from 'src/app/components/modificar-admin/modificar-admin.component';
import { EmpresasComponent } from '../empresas/empresas.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminSysPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AdminSistemaPage,
    RegistroAdminComponent,
    ModificarEmpresaComponent,
    ModificarAdminComponent,
    EmpresasComponent,
    TabsComponent,
  ],
})
export class AdminSysPageModule {}
