import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import { RecordarContrasenaComponent } from '../recordar-contrasena/recordar-contrasena.component';
import { GoogleButtonComponent } from '../google-button/google-button.component';
import { BotonComponent } from '../boton/boton.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatList, MatListItem} from '@angular/material/list';
import { MatCard, MatCardHeader, MatCardTitle} from '@angular/material/card';

@NgModule({
  declarations: [
    HeaderComponent,
    RecordarContrasenaComponent,
    GoogleButtonComponent,
    BotonComponent,
  ],
  exports: [
    HeaderComponent,
    RecordarContrasenaComponent,
    GoogleButtonComponent,
    BotonComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLinkWithHref,    
    MatToolbarModule,
    MatList,
    MatListItem,
    MatCard, 
    MatCardHeader, 
    MatCardTitle
  ],
})
export class SharedModule {}
