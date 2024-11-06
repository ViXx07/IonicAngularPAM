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
import { ApiRestService } from 'src/app/services/restApi/api-rest.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-admin-sistema',
  templateUrl: './admin-sistema.page.html',
  styleUrls: ['./admin-sistema.page.scss'],
})
export class AdminSistemaPage implements OnInit {
  empresas: any = [];
  admins: User[] = [];
  private subscriptions: Subscription[] = [];
  private suscripcion: Subscription;

  loadingData: boolean = true;
  platform = inject(Platform);
  utils = inject(UtilsService);
  firebase = inject(FirebaseConfigService);
  api = inject(ApiRestService);
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

  async mostrarRegistroAdmin() {
    let success = await this.utils.presentarModal({
      component: RegistroAdminComponent,
    });

    if (success) this.getAdmins();
  }

  async mostrarRegistroEmpresa() {
    let success = await this.utils.presentarModal({
      component: RegistroEmpresaComponent,
    });

    if (success) this.getEmpresas();
  }

  async mostrarModificarEmpresa(empresa: Empresa) {
    let success = await this.utils.presentarModal({
      component: ModificarEmpresaComponent,
      componentProps: { empresa },
    });

    if (success) this.getEmpresas();
  }

  async mostrarModificarAdmin(admin: User) {
    let success = await this.utils.presentarModal({
      component: ModificarAdminComponent,
      componentProps: { admin },
    });

    if (success) this.getEmpresas();
  }

  //Consulta a la api:
  getEmpresas() {
    if (this.platform.is('capacitor')) {
      let path = 'empresas';

      let sub = this.firebase.getCollectionData(path).subscribe({
        next: (res: any) => {
          this.empresas = res;
          sub.unsubscribe();
        },
      });
    } else {
      this.suscripcion = this.api.getEmpresas().subscribe((data) => {
        this.empresas = data;
      });
    }
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

  async confirmarEliminarEmpresa(empresa: Empresa) {
    this.utils.presentAlert({
      header: 'Eliminar Empresa',
      message: '¿Quieres eliminar esta empresa?',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarEmpresa(empresa);
            //Eliminación en la api.
            this.api.deleteEmpresa(empresa.id).subscribe((resultado) => {
              console.log('Empresa eliminada');
              this.getEmpresas();
            });
          },
        },
      ],
    });
  }

  async eliminarEmpresa(empresa: Empresa) {
    let path = `empresas/${empresa.id}`;

    const loading = await this.utils.loading();
    await loading.present();

    this.firebase
      .deleteDocument(path)
      .then(async (res) => {
        this.utils.presentToast({
          message: 'Empresa eliminada',
          duration: 1500,
          color: 'success',
          position: 'middle',
          icon: 'checkmark-circle-outline',
        });
      })
      .catch((error) => {
        console.log(error);
        this.utils.presentToast({
          message: 'Error al eliminar la empresa',
          duration: 1500,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline',
        });
      })
      .finally(() => {
        loading.dismiss();
      });
  }
}
