import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminSysPageRoutingModule } from './admin-sys-routing.module';

import { AdminSysPage } from './admin-sys.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminSysPageRoutingModule
  ],
  declarations: [AdminSysPage]
})
export class AdminSysPageModule {}
