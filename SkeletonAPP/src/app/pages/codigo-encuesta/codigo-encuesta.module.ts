import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigoEncuestaPageRoutingModule } from './codigo-encuesta-routing.module';

import { CodigoEncuestaPage } from './codigo-encuesta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoEncuestaPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CodigoEncuestaPage],
})
export class CodigoEncuestaPageModule {}
