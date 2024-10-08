import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroAdminPageRoutingModule } from './registro-admin-routing.module';

import { RegistroAdminPage } from './registro-admin.page';
import { SharedModule } from "../../components/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroAdminPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
],
  declarations: [RegistroAdminPage],
})
export class RegistroAdminPageModule {}
