import { Component, ComponentRef, inject, OnInit } from '@angular/core';
import { ModificarAdminComponent } from 'src/app/components/modificar-admin/modificar-admin.component';
import { ModificarEmpresaComponent } from 'src/app/components/modificar-empresa/modificar-empresa.component';
import { RegistroAdminComponent } from 'src/app/components/registro-admin/registro-admin.component';
import { RegistroEmpresaComponent } from 'src/app/components/registro-empresa/registro-empresa.component';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-admin-sys',
  templateUrl: './admin-sys.page.html',
  styleUrls: ['./admin-sys.page.scss'],
})
export class AdminSysPage {

  
  utils = inject(UtilsService);
 
  mostrarRegistroAdmin() {
    this.utils.presentarModal({
      component: RegistroAdminComponent
    })
  }

  mostrarRegistroEmpresa() {
    this.utils.presentarModal({
      component: RegistroEmpresaComponent
    })
  }

  mostrarModificarEmpresa() {
    this.utils.presentarModal({
      component: ModificarEmpresaComponent
    })
  }

  mostrarModificarAdmin() {
    this.utils.presentarModal({
      component: ModificarAdminComponent
    })
  }
}

