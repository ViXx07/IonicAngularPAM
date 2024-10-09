import { Component, inject } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  platform = inject(Platform);
  utils = inject(UtilsService);
  scanResult = '';
  isMobile = false;

  constructor() {}

  ngOnInit() {
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
      this.isMobile = true;
    }
  }

  async scannerQR() {
    const modal = await this.utils.modalCtrl.create({
      component: BarcodeScanningModalComponent,
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
      this.scanResult = data?.barcode?.displayValue;
      this.utils.routerlink(this.scanResult);
      this.utils.presentToast({
        message: 'QR escaneado exitosamente.',
        duration: 2500,
        color: 'success',
        position: 'middle',
        icon: 'qr-code-outline',
      });
    }
  }
}
