import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigoEncuestaPageRoutingModule } from './codigo-encuesta-routing.module';

import { CodigoEncuestaPage } from './codigo-encuesta.page';
import { SharedModule } from "../../components/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoEncuestaPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
],
  declarations: [CodigoEncuestaPage],
})
export class CodigoEncuestaPageModule {}
