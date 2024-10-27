import { Component, inject } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage {
  
  utils = inject(UtilsService);

  redireccion() {
    let rol = this.utils.getUserRole();
    this.utils.redireccionPorRol(rol);
  }
}
