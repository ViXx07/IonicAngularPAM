import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { where } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ModificarEmpresaComponent } from 'src/app/components/modificar-empresa/modificar-empresa.component';
import { RegistroEmpresaComponent } from 'src/app/components/registro-empresa/registro-empresa.component';
import { Empresa } from 'src/app/models/empresa.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { ApiRestService } from 'src/app/services/restApi/api-rest.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss'],
})
export class EmpresasComponent implements OnInit, OnDestroy {
  empresas: any = [];
  private subscriptions: Subscription[] = [];

  loadingData: boolean = true;
  platform = inject(Platform);
  utils = inject(UtilsService);
  firebase = inject(FirebaseConfigService);
  api = inject(ApiRestService);

  ngOnInit() {
    try {
      this.getEmpresas();
    } catch (error) {
      console.error('Error loading data', error);
    }
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

  async getEmpresas() {
    const loading = await this.utils.loading();
    await loading.present();

    let path = 'empresas';

    const sub = this.firebase.getCollectionData(path).subscribe({
      next: (res: any) => {
        this.empresas = res;
      },
      error: (err) => {
        console.error('Error fetching admins:', err);
      },
    });

    this.subscriptions.push(sub); // Guarda la suscripción
    setTimeout(() => {
      loading.dismiss();
      this.loadingData = false; // Cambia a false una vez que los datos están cargados y después de la espera
    }, 1000);
  }

  async getEmpresasAprobadas() {
    const loading = await this.utils.loading();
    await loading.present();

    let path = 'empresas';
    let query = where('estado', '==', 0);
    const sub = this.firebase.getCollectionData(path, query).subscribe({
      next: (res: any) => {
        this.empresas = res;
      },
      error: (err) => {
        console.error('Error fetching admins:', err);
      },
    });

    this.subscriptions.push(sub); // Guarda la suscripción
    setTimeout(() => {
      loading.dismiss();
      this.loadingData = false; // Cambia a false una vez que los datos están cargados y después de la espera
    }, 1000);
  }

  async getEmpresasEspera() {
    const loading = await this.utils.loading();
    await loading.present();

    let path = 'empresas';
    let query = where('estado', '==', 1);
    const sub = this.firebase.getCollectionData(path, query).subscribe({
      next: (res: any) => {
        this.empresas = res;
      },
      error: (err) => {
        console.error('Error fetching admins:', err);
      },
    });

    this.subscriptions.push(sub); // Guarda la suscripción
    setTimeout(() => {
      loading.dismiss();
      this.loadingData = false; // Cambia a false una vez que los datos están cargados y después de la espera
    }, 1000);
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
        this.getEmpresas();
      });
  }

  async aprobarEmpresa(empresa: Empresa) {
    if (empresa.estado !== 0) {
      let path = `empresas/${empresa.id}`;

      const loading = await this.utils.loading();
      await loading.present();

      empresa.estado = 0;

      this.firebase
        .updateDocument(path, empresa)
        .then(async (res) => {
          this.utils.routerlink('admin/empresas');
          this.utils.presentToast({
            message: 'Empresa aprobada',
            duration: 2500,
            color: 'success',
            position: 'middle',
            icon: 'checkmark-circle-outline',
          });
        })
        .catch((error) => {
          console.log(error);
          this.utils.presentToast({
            message: error.message,
            duration: 2500,
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

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
