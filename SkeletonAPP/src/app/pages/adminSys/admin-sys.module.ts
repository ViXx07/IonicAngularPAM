import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminSysPageRoutingModule } from './admin-sys-routing.module';

import { AdminSysPage } from './admin-sys.page';
import { SharedModule } from '../../components/shared/shared.module';
import { RegistroAdminComponent } from 'src/app/components/registro-admin/registro-admin.component';
import { RegistroEmpresaComponent } from 'src/app/components/registro-empresa/registro-empresa.component';
import { ModificarEmpresaComponent } from 'src/app/components/modificar-empresa/modificar-empresa.component';
import { ModificarAdminComponent } from 'src/app/components/modificar-admin/modificar-admin.component';

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
    AdminSysPage,
    RegistroAdminComponent,
    RegistroEmpresaComponent,
    ModificarEmpresaComponent,
    ModificarAdminComponent,
  ],
})
export class AdminSysPageModule {}
