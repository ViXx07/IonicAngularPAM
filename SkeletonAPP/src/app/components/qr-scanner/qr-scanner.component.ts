import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  BarcodeFormat,
  BarcodeScanner,
  LensFacing,
  StartScanOptions,
} from '@capacitor-mlkit/barcode-scanning';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Torch } from '@capawesome/capacitor-torch';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  public formats: BarcodeFormat[] = [];
  @Input()
  public lensFacing: LensFacing = LensFacing.Back;

  @ViewChild('square')
  utils = inject(UtilsService);

  public squareElement: ElementRef<HTMLDivElement> | undefined;

  public isTorchAvailable = false;

  constructor(private readonly ngZone: NgZone) {}

  public ngOnInit(): void {
    Torch.isAvailable().then((result) => {
      this.isTorchAvailable = result.available;
    });
  }

  public ngAfterViewInit() {
    //Inicializa el escáner despues de 1/4 de segundo.
    setTimeout(() => {
      this.startScan();
    }, 250);
  }

  public ngOnDestroy() {
    this.stopScan();
  }

  public async toggleTorch(): Promise<void> {
    await Torch.enable();
  }

  private async startScan(): Promise<void> {
    // Esconde todo detras del modal:
    document.querySelector('body')?.classList.add('barcode-scanning-active');

    //Opciones del escaneo, dirección de la camára:
    const options: StartScanOptions = {
      formats: this.formats,
      lensFacing: this.lensFacing,
    };

    //Dimensiones del rectángulo de detección:
    const squareElementBoundingClientRect =
      this.squareElement?.nativeElement.getBoundingClientRect();

    //Escala las coordenadas basándose en el devicePixelRatio, para que se ajusten a diferentes pantallas.
    const scaledRect = squareElementBoundingClientRect
      ? {
          left: squareElementBoundingClientRect.left * window.devicePixelRatio,
          right:
            squareElementBoundingClientRect.right * window.devicePixelRatio,
          top: squareElementBoundingClientRect.top * window.devicePixelRatio,
          bottom:
            squareElementBoundingClientRect.bottom * window.devicePixelRatio,
          width:
            squareElementBoundingClientRect.width * window.devicePixelRatio,
          height:
            squareElementBoundingClientRect.height * window.devicePixelRatio,
        }
      : undefined;

    //Define los puntos de las esquinas del rectángulo:
    const detectionCornerPoints = scaledRect
      ? [
          [scaledRect.left, scaledRect.top],
          [scaledRect.left + scaledRect.width, scaledRect.top],
          [
            scaledRect.left + scaledRect.width,
            scaledRect.top + scaledRect.height,
          ],
          [scaledRect.left, scaledRect.top + scaledRect.height],
        ]
      : undefined;
    //Listener que se espera a que se encuentre un código QR:
    const listener = await BarcodeScanner.addListener(
      'barcodeScanned',
      async (event) => {
        this.ngZone.run(() => {
          const cornerPoints = event.barcode.cornerPoints;
          //Verifica que las esquinas del escaner se encuentren fuera de las esquinas del QR:
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
          listener.remove();
        });
      }
    );
    //Procesa la variable encontrada en el QR:
    await BarcodeScanner.startScan(options);
  }

  private async stopScan(): Promise<void> {
    // Muestra el home otra vez al apretar el botón 'Regresar'.
    document.querySelector('body')?.classList.remove('barcode-scanning-active');

    await BarcodeScanner.stopScan();
  }
}
