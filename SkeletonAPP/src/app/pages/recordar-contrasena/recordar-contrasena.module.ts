import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordarContrasenaPageRoutingModule } from './recordar-contrasena-routing.module';

import { RecordarContrasenaPage } from './recordar-contrasena.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordarContrasenaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RecordarContrasenaPage]
})
export class RecordarContrasenaPageModule {}
