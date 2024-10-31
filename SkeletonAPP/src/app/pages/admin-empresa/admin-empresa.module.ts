import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminEmpresaPageRoutingModule } from './admin-empresa-routing.module';

import { AdminEmpresaPage } from './admin-empresa.page';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { ModificarEncuestaComponent } from 'src/app/components/modificar-encuesta/modificar-encuesta.component';
import { registrarEncuestaComponent } from 'src/app/components/registrar-encuesta/registrar-encuesta.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminEmpresaPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [AdminEmpresaPage, ModificarEncuestaComponent, registrarEncuestaComponent]
})
export class AdminEmpresaPageModule {}
