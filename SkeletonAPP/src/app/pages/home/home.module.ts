import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from '../../components/shared/shared.module';
import { QrScannerComponent } from 'src/app/components/qr-scanner/qr-scanner.component';
import { OpinaPage } from '../opina/opina.page';
import { CodigoEncuestaPage } from '../codigo-encuesta/codigo-encuesta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [HomePage, OpinaPage, CodigoEncuestaPage, QrScannerComponent],
})
export class HomePageModule {}
