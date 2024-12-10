import { Component, ElementRef, Inject, Input, NgZone, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { BarcodeFormat, BarcodeScanner, LensFacing, StartScanOptions } from '@capacitor-mlkit/barcode-scanning';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Platform } from '@ionic/angular';  // Import Platform service to detect platform
import { Torch } from '@capawesome/capacitor-torch';
import { documentId, where } from '@angular/fire/firestore';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { Encuesta } from 'src/app/models/encuesta.model';
import { Empresa } from 'src/app/models/empresa.model';
import { Subscription } from 'rxjs';
import { OpinaPage } from 'src/app/pages/opina/opina.page';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public formats: BarcodeFormat[] = [];
  @Input() public lensFacing: LensFacing = LensFacing.Back;

  @ViewChild('square') squareElement: ElementRef<HTMLDivElement> | undefined;

  utils= Inject(UtilsService);
  firebase = Inject(FirebaseConfigService);

  encuesta: Encuesta;
  empresa: Empresa;
  deshabilitado: boolean = false;
  private subscriptions: Subscription[] = [];
  public isTorchAvailable = false;

  constructor(
    private readonly ngZone: NgZone,
    private platform: Platform
  ) {}

  ngOnInit(): void {
    if (this.platform.is('capacitor')) {
      Torch.isAvailable().then((result) => {
        this.isTorchAvailable = result.available;
      });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.startScan();
    }, 250);
  }

  ngOnDestroy() {
    this.stopScan();
  }

  public async toggleTorch(): Promise<void> {
    if (this.platform.is('capacitor') && this.isTorchAvailable) {
      await Torch.enable();
    }
  }

  private async startScan(): Promise<void> {
    if (!this.platform.is('capacitor')) {
      console.log('BarcodeScanner not available on web');
      return;
    }

    document.querySelector('body')?.classList.add('barcode-scanning-active');

    const options: StartScanOptions = {
      formats: this.formats,
      lensFacing: this.lensFacing,
    };

    const squareElementBoundingClientRect =
      this.squareElement?.nativeElement.getBoundingClientRect();

    const scaledRect = squareElementBoundingClientRect
      ? {
          left: squareElementBoundingClientRect.left * window.devicePixelRatio,
          right: squareElementBoundingClientRect.right * window.devicePixelRatio,
          top: squareElementBoundingClientRect.top * window.devicePixelRatio,
          bottom: squareElementBoundingClientRect.bottom * window.devicePixelRatio,
          width: squareElementBoundingClientRect.width * window.devicePixelRatio,
          height: squareElementBoundingClientRect.height * window.devicePixelRatio,
        }
      : undefined;

    const detectionCornerPoints = scaledRect
      ? [
          [scaledRect.left, scaledRect.top],
          [scaledRect.left + scaledRect.width, scaledRect.top],
          [scaledRect.left + scaledRect.width, scaledRect.top + scaledRect.height],
          [scaledRect.left, scaledRect.top + scaledRect.height],
        ]
      : undefined;

    const listener = await BarcodeScanner.addListener(
      'barcodeScanned',
      async (event) => {
        this.ngZone.run(() => {
          const cornerPoints = event.barcode.cornerPoints;
          if (detectionCornerPoints && cornerPoints) {
            if (
              detectionCornerPoints[0][0] > cornerPoints[0][0] ||
              detectionCornerPoints[0][1] > cornerPoints[0][1] ||
              detectionCornerPoints[1][0] < cornerPoints[1][0] ||
              detectionCornerPoints[1][1] > cornerPoints[1][1] ||
              detectionCornerPoints[2][0] < cornerPoints[2][0] ||
              detectionCornerPoints[2][1] < cornerPoints[2][1] ||
              detectionCornerPoints[3][0] > cornerPoints[3][0] ||
              detectionCornerPoints[3][1] < cornerPoints[3][1]
            ) {
              return;
            }
          }
          const scannedValue = event.barcode.displayValue;
          this.redireccionEncuesta(scannedValue);
          listener.remove();
        });
      }
    );

    await BarcodeScanner.startScan(options);
  }

  private async stopScan(): Promise<void> {
    if (!this.platform.is('capacitor')) {
      await BarcodeScanner.stopScan();
    }
    document.querySelector('body')?.classList.remove('barcode-scanning-active');
  }

  redireccionEncuesta(codigo: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const path = 'encuestas';
      const query = where('id', '==', codigo);
      const sub = this.firebase.getCollectionData(path, query).subscribe({
        next: async (res: Encuesta[]) => {
          if (res.length > 0) {
            this.encuesta = res[0]; // Asigna el primer usuario encontrado
            await this.getEmpresa();
            this.presentarEncuesta(res[0], this.empresa, this.deshabilitado);
          } else {
            this.encuesta = null; // Maneja el caso donde no se encuentra el usuario
            console.log("No se encontro la encuesta.");
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
}
