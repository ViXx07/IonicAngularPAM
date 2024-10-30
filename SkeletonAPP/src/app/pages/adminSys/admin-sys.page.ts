import { Component, inject, OnInit } from '@angular/core';
import { ModificarAdminComponent } from 'src/app/components/modificar-admin/modificar-admin.component';
import { ModificarEmpresaComponent } from 'src/app/components/modificar-empresa/modificar-empresa.component';
import { RegistroAdminComponent } from 'src/app/components/registro-admin/registro-admin.component';
import { RegistroEmpresaComponent } from 'src/app/components/registro-empresa/registro-empresa.component';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Empresa } from 'src/app/models/empresa.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { where } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-sys',
  templateUrl: './admin-sys.page.html',
  styleUrls: ['./admin-sys.page.scss'],
})
export class AdminSysPage implements OnInit {
  empresas: Empresa[] = [];
  admins: User[] = [];
  private subscriptions: Subscription[] = [];

  loadingData: boolean = true; // Inicialmente en true
  utils = inject(UtilsService);
  firebase = inject(FirebaseConfigService);
  form = new FormGroup({
    empresaSeleccionada: new FormControl('', Validators.required),
  });

  async ngOnInit() {
    const loading = await this.utils.loading();
    await loading.present();

    try {
      await Promise.all([this.getAdmins(), this.getEmpresas()]); // Espera a que ambas promesas se resuelvan
    } catch (error) {
      console.error('Error loading data', error);
    }

    // Espera 2 segundos antes de cerrar el loading
    setTimeout(() => {
      loading.dismiss();
      this.loadingData = false; // Cambia a false una vez que los datos están cargados y después de la espera
    }, 1000); // 1000 milisegundos = 1 segundos
  }

  mostrarRegistroAdmin() {
    this.utils.presentarModal({
      component: RegistroAdminComponent,
    });
  }

  mostrarRegistroEmpresa() {
    this.utils.presentarModal({
      component: RegistroEmpresaComponent,
    });
  }

  async mostrarModificarEmpresa(empresa: Empresa) {
    let success = await this.utils.presentarModal({
      component: ModificarEmpresaComponent,
      componentProps: { empresa },
    });

    if (success) this.getEmpresas();
  }

  async mostrarModificarAdmin(admin: User) {
    let succes = await this.utils.presentarModal({
      component: ModificarAdminComponent,
      componentProps: { admin },
    });
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
    let path = 'users';
    let query = where('userRole', 'in', [2, 3]);
    const sub = this.firebase.getCollectionData(path, query).subscribe({
      next: (res: any) => {
        this.admins = res;
      },
      error: (err) => {
        console.error('Error fetching admins:', err);
      },
    });

    this.subscriptions.push(sub); // Guarda la suscripción
  }

  ngOnDestroy() {
    // Desuscribirse de todas las suscripciones
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
