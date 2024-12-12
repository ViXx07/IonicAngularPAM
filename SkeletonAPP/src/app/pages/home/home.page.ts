import { Component, inject, OnDestroy } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { QrScannerComponent } from 'src/app/components/qr-scanner/qr-scanner.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Platform } from '@ionic/angular';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { User } from '@codetrix-studio/capacitor-google-auth';
import { documentId, where } from '@angular/fire/firestore';
import { Encuesta } from 'src/app/models/encuesta.model';
import { Empresa } from 'src/app/models/empresa.model';
import { OpinaPage } from '../opina/opina.page';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {
  platform = inject(Platform);
  utils = inject(UtilsService);
  firebase = inject(FirebaseConfigService);
  scanResult = '';
  isMobile = false;
  usuario: User;

  empresa: Empresa;
  encuesta: Encuesta;
  deshabilitado: boolean = false;
  private subscriptions: Subscription[] = [];

  ngOnInit() {
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
      this.isMobile = true;
    }
    this.usuario = this.utils.getFromLocalStorage('user');
  }

  async scannerQR() {
    const modal = await this.utils.modalCtrl.create({
      component: QrScannerComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: [],
        LensFacing: LensFacing.Back,
      },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.scanResult = data.scanResult;
      this.redireccionEncuesta(this.scanResult);
    }
  }
  async redireccionEncuesta(codigo: string): Promise<void> {
    const loading = await this.utils.loading();
    await loading.present();

    return new Promise((resolve, reject) => {
      const path = 'encuestas';
      const query = where('id', '==', codigo);
      const sub = this.firebase.getCollectionData(path, query).subscribe({
        next: async (res: Encuesta[]) => {
          if (res.length > 0) {
            this.encuesta = res[0]; // Asigna el primer usuario encontrado
            await this.getEmpresa();
            this.utils.presentToast({
              message: 'QR escaneado exitosamente.',
              duration: 2500,
              color: 'success',
              position: 'middle',
              icon: 'qr-code-outline',
            });
            loading.dismiss();
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
            loading.dismiss();
          }
          resolve(); // Resuelve la promesa aquí
        },
        error: (err) => {
          loading.dismiss();
          console.error('Error fetching data:', err);
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

  presentarEncuesta(
    encuesta: Encuesta,
    empresa: Empresa,
    deshabilitado: boolean
  ) {
    this.utils.presentarModal({
      component: OpinaPage,
      componentProps: { encuesta, empresa, deshabilitado },
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
