import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { documentId, where } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { GenerarQrComponent } from 'src/app/components/generar-qr/generar-qr.component';
import { ModificarEncuestaComponent } from 'src/app/components/modificar-encuesta/modificar-encuesta.component';
import { Empresa } from 'src/app/models/empresa.model';
import { Encuesta } from 'src/app/models/encuesta.model';
import { User } from 'src/app/models/user.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { OpinaPage } from '../opina/opina.page';

@Component({
  selector: 'app-admin-empresa',
  templateUrl: './admin-empresa.page.html',
  styleUrls: ['./admin-empresa.page.scss'],
})
export class AdminEmpresaPage implements OnInit, OnDestroy {
  usuario: User;
  empresa: Empresa;
  encuesta: Encuesta;
  private subscriptions: Subscription[] = [];

  utils = inject(UtilsService);
  firebase = inject(FirebaseConfigService);

  async ngOnInit() {
    const loading = await this.utils.loading();
    await loading.present();
  
    try {
      await this.getUser(); // Espera a que se recupere el usuario
      if (this.usuario) {
        await this.getEmpresa(); // Espera a que se recupere la empresa
        if (this.empresa) {
          await this.getEncuesta(); // Espera a que se recupere la encuesta
        }
      } else {
        console.error('No se encontró el usuario.');
      }
    } catch (error) {
      console.error('Error loading data', error);
    } finally {
      await loading.dismiss();
    }
  }
  
  modificarEncuesta(encuesta: Encuesta, empresa: Empresa) {
    this.utils.presentarModal({
      component: ModificarEncuestaComponent,
      componentProps: { encuesta, empresa},
    });
  }

  generarQR(encuesta: Encuesta, empresa: Empresa) {
    this.utils.presentarModal({
      component: GenerarQrComponent,
      componentProps: { encuesta, empresa},
    });
  }

  getUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      const path = 'users';
      const uid = this.utils.getUid();
      const query = where('uid', '==', uid);
      const sub = this.firebase.getCollectionData(path, query).subscribe({
        next: (res: User[]) => {
          if (res.length > 0) {
            this.usuario = res[0]; // Asigna el primer usuario encontrado
          } else {
            this.usuario = null; // Maneja el caso donde no se encuentra el usuario
          }
          resolve(); // Resuelve la promesa aquí
        },
        error: (err) => {
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
      const empresaId = this.usuario.empresa;
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
  async getEncuesta(): Promise<void> {
    return new Promise((resolve, reject) => {
      const path = 'encuestas';
      const empresaId = this.empresa.id;
      const query = where('idEmpresa', '==', empresaId);

      const sub = this.firebase.getCollectionData(path, query).subscribe({
        next: (res: Encuesta[]) => {
          this.encuesta = res.length > 0 ? res[0] : null;
          resolve();
        },
        error: (err) => {
          console.error('Error fetching encuesta:', err);
          reject(err);
        },
      });
      this.subscriptions.push(sub);
    });
  }

  verEncuesta(empresa: Empresa, encuesta: Encuesta){
    this.utils.presentarModal({
      component: OpinaPage,
      componentProps: [empresa, encuesta]
    })
  }

  ngOnDestroy() {
    // Desuscribirse de todas las suscripciones
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
