import { Component, ComponentRef, inject, OnInit } from '@angular/core';
import { ModificarAdminComponent } from 'src/app/components/modificar-admin/modificar-admin.component';
import { ModificarEmpresaComponent } from 'src/app/components/modificar-empresa/modificar-empresa.component';
import { RegistroAdminComponent } from 'src/app/components/registro-admin/registro-admin.component';
import { RegistroEmpresaComponent } from 'src/app/components/registro-empresa/registro-empresa.component';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Empresa } from 'src/app/models/empresa.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-admin-sys',
  templateUrl: './admin-sys.page.html',
  styleUrls: ['./admin-sys.page.scss'],
})
export class AdminSysPage {

  empresas: Empresa[] = [];
  admins: User[] = [];

  utils = inject(UtilsService);
  firebase = inject(FirebaseConfigService);
  form = new FormGroup({
    empresaSeleccionada: new FormControl('', Validators.required),
  });
 
  mostrarRegistroAdmin() {
    this.utils.presentarModal({
      component: RegistroAdminComponent
    })
  }

  mostrarRegistroEmpresa() {
    this.utils.presentarModal({
      component: RegistroEmpresaComponent,
    })
  }

  async mostrarModificarEmpresa(empresa: Empresa) {
    let success = await this.utils.presentarModal({
      component: ModificarEmpresaComponent,
      componentProps: {empresa}
    })

    if (success) this.getEmpresas();
    
  }

  async mostrarModificarAdmin(admin: User) {
    let succes = await this.utils.presentarModal({
      component: ModificarAdminComponent,
      componentProps: {admin}
    })
  }

  getEmpresas() {
    let path = 'empresas';

    let sub = this.firebase.getCollectionData(path).subscribe({
      next: (res: any) => {
        this.empresas = res;
        sub.unsubscribe();
      },
    });
  }

  getAdmins() {
    /*
    let path = 'users';
    let sub = this.firebase.getCollectionData(path, ref => ref.where("userRole", 'in', [2, 3])).subscribe({
      next: (res: any) => {
        this.admins = res;
        sub.unsubscribe();
      },
    });*/
  }

  ionViewWillEnter() {
    this.getEmpresas();
    this.getAdmins();
  }

}

