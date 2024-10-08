import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpinaPageRoutingModule } from './opina-routing.module';

import { OpinaPage } from './opina.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, OpinaPageRoutingModule],
  declarations: [OpinaPage],
})
export class OpinaPageModule {}
