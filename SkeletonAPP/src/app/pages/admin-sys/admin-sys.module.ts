import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminSysPageRoutingModule } from './admin-sys-routing.module';

import { AdminSysPage } from './admin-sys.page';
import { SharedModule } from '../../components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminSysPageRoutingModule,
    SharedModule,
  ],
  declarations: [AdminSysPage],
})
export class AdminSysPageModule {}
