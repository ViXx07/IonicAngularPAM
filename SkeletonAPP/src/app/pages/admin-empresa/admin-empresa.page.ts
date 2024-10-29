import { Component, inject, OnInit } from '@angular/core';
import { ModificarEncuestaComponent } from 'src/app/components/modificar-encuesta/modificar-encuesta.component';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-admin-empresa',
  templateUrl: './admin-empresa.page.html',
  styleUrls: ['./admin-empresa.page.scss'],
})
export class AdminEmpresaPage {

  utils = inject(UtilsService);

  modificarEncuesta() {
    this.utils.presentarModal({
      component: ModificarEncuestaComponent
    })
  }
}
