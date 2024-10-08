import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import { RecordarContrasenaComponent } from '../recordar-contrasena/recordar-contrasena.component';

@NgModule({
  declarations: [HeaderComponent, RecordarContrasenaComponent],
  exports: [HeaderComponent, RecordarContrasenaComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLinkWithHref,
  ],
})
export class SharedModule {}
