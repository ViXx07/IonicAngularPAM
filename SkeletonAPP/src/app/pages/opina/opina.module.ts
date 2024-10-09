import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpinaPageRoutingModule } from './opina-routing.module';

import { OpinaPage } from './opina.page';
import { SharedModule } from "../../components/shared/shared.module";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, OpinaPageRoutingModule, SharedModule, ReactiveFormsModule],
  declarations: [OpinaPage],
})
export class OpinaPageModule {}
