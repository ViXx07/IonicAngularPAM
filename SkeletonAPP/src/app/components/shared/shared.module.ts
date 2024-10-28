import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import { RecordarContrasenaComponent } from '../recordar-contrasena/recordar-contrasena.component';
import { GoogleButtonComponent } from '../google-button/google-button.component';
import { BotonComponent } from '../boton/boton.component';

@NgModule({
  declarations: [HeaderComponent, RecordarContrasenaComponent, GoogleButtonComponent, BotonComponent],
  exports: [HeaderComponent, RecordarContrasenaComponent, GoogleButtonComponent, BotonComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLinkWithHref,
  ],
})
export class SharedModule {}
