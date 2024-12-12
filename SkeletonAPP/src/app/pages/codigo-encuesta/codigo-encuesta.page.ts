import { Component, inject, OnDestroy } from '@angular/core';
import { documentId, where } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Encuesta } from 'src/app/models/encuesta.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { OpinaPage } from '../opina/opina.page';
import { Empresa } from 'src/app/models/empresa.model';

@Component({
  selector: 'app-codigo-encuesta',
  templateUrl: './codigo-encuesta.page.html',
  styleUrls: ['./codigo-encuesta.page.scss'],
})
export class CodigoEncuestaPage implements OnDestroy{
  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);

  encuesta: Encuesta;
  empresa: Empresa;
  deshabilitado: boolean = false;

  private subscriptions: Subscription[] = [];

  codigoForm = new FormGroup({
    codigo: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
      Validators.maxLength(20),
    ]),
  });

  async redireccionEncuesta(): Promise<void> {
    const loading = await this.utils.loading();
    await loading.present();

    return new Promise((resolve, reject) => {
      const path = 'encuestas';
      const codigo = this.codigoForm.controls.codigo.value;
      const query = where('id', '==', codigo);
      const sub = this.firebase.getCollectionData(path, query).subscribe({
        next: async (res: Encuesta[]) => {
          if (res.length > 0) {
            this.encuesta = res[0]; // Asigna el primer usuario encontrado
            await this.getEmpresa();
            this.presentarEncuesta(res[0], this.empresa, this.deshabilitado);
          } else {
            this.encuesta = null; // Maneja el caso donde no se encuentra el usuario
            this.utils.presentToast({
              message: 'Encuesta no encontrada',
              duration: 2500,
              color: 'danger',
              position: 'middle',
              icon: 'alert-circle-outline',
            });
          }
          loading.dismiss();
          resolve(); // Resuelve la promesa aquí
        },
        error: (err) => {
          loading.dismiss();

          console.error('Error fetching user:', err);
          reject(err); // Rechaza la promesa en caso de error
        },
      });

      this.subscriptions.push(sub); // Guarda la suscripción
    });
  }

  async getEmpresa(): Promise<void> {
    return new Promise((resolve, reject) => {
      const path = 'empresas';
      const empresaId = this.encuesta.idEmpresa;
      const query = where(documentId(), '==', empresaId);

      const sub = this.firebase.getCollectionData(path, query).subscribe({
        next: (res: Empresa[]) => {
          this.empresa = res.length > 0 ? res[0] : null;
          resolve();
        },
        error: (err) => {
          console.error('Error fetching empresa:', err);
          reject(err);
        },
      });
      this.subscriptions.push(sub);
    });
  }

  presentarEncuesta(encuesta: Encuesta, empresa: Empresa, deshabilitado: boolean){
    this.utils.presentarModal({
      component: OpinaPage,
      componentProps: {encuesta, empresa, deshabilitado}
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
