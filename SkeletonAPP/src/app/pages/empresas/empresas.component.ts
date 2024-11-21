import { Component, inject, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
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
export class EmpresasComponent implements OnInit {
  empresas: any = [];
  loadingData: boolean = true;
  platform = inject(Platform);
  utils = inject(UtilsService);
  firebase = inject(FirebaseConfigService);
  api = inject(ApiRestService);

  async ngOnInit() {
    const loading = await this.utils.loading();
    await loading.present();

    try {
      this.getEmpresas();
    } catch (error) {
      console.error('Error loading data', error);
    }

    // Espera 2 segundos antes de cerrar el loading
    setTimeout(() => {
      loading.dismiss();
      this.loadingData = false; // Cambia a false una vez que los datos están cargados y después de la espera
    }, 1000); // 1000 milisegundos = 1 segundos
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

  //Consulta a la api:
  getEmpresas() {
    let path = 'empresas';

    let sub = this.firebase.getCollectionData(path).subscribe({
      next: (res: any) => {
        this.empresas = res;
        sub.unsubscribe();
      },
    });
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
}
