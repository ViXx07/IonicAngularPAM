import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashPageRoutingModule } from './splash-routing.module';

import { SplashPage } from './splash.page';
import { LoginPage } from '../login/login.page';
import { BotonComponent } from 'src/app/components/boton/boton.component';
import { RegistroClienteComponent } from 'src/app/components/registro-cliente/registro-cliente.component';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SplashPageRoutingModule,
  ],
  declarations: [SplashPage, LoginPage, RegistroClienteComponent,]
})
export class SplashPageModule {}
