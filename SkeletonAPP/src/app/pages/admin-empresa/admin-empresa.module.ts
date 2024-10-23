import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminEmpresaPageRoutingModule } from './admin-empresa-routing.module';

import { AdminEmpresaPage } from './admin-empresa.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminEmpresaPageRoutingModule,
    SharedModule
  ],
  declarations: [AdminEmpresaPage]
})
export class AdminEmpresaPageModule {}
