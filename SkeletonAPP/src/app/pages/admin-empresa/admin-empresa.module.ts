import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminEmpresaPageRoutingModule } from './admin-empresa-routing.module';

import { AdminEmpresaPage } from './admin-empresa.page';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { ModificarEncuestaComponent } from 'src/app/components/modificar-encuesta/modificar-encuesta.component';
import { GraficoEmpresaComponent } from 'src/app/components/grafico-empresa/grafico-empresa.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { GenerarQrComponent } from 'src/app/components/generar-qr/generar-qr.component';
import { QrCodeModule } from 'ng-qrcode';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminEmpresaPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CanvasJSAngularChartsModule,
    QrCodeModule
  ],
  declarations: [AdminEmpresaPage, ModificarEncuestaComponent, GraficoEmpresaComponent, GenerarQrComponent]
})
export class AdminEmpresaPageModule {}
