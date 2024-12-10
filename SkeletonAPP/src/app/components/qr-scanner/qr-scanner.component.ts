import {
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import {
  Barcode,
  BarcodeFormat,
  BarcodeScanner,
  LensFacing,
  StartScanOptions,
} from '@capacitor-mlkit/barcode-scanning';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Torch } from '@capawesome/capacitor-torch';
import { Encuesta } from 'src/app/models/encuesta.model';
import { Empresa } from 'src/app/models/empresa.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public formats: BarcodeFormat[] = [];
  @Input() public lensFacing: LensFacing = LensFacing.Back;

  @ViewChild('square') squareElement: ElementRef<HTMLDivElement> | undefined;

  utils = inject(UtilsService);
  
  public isTorchAvailable = false;

  constructor(private readonly ngZone: NgZone) {}

  async ngOnInit() {

    const permissions = await BarcodeScanner.checkPermissions();
    if (permissions.camera === 'denied') {
      await BarcodeScanner.requestPermissions(); // Solicita los permisos
    }

    Torch.isAvailable().then((result) => {
      this.isTorchAvailable = result.available;
    });
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
    await Torch.enable();
  }

  private async startScan(): Promise<void> {
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
          listener.remove();
          this.closeModal(event.barcode)
        });
      }
    );

    await BarcodeScanner.startScan(options);
  }

  private async stopScan(): Promise<void> {
    document.querySelector('body')?.classList.remove('barcode-scanning-active');

    await BarcodeScanner.stopScan();
  }

  public async closeModal(barcode?: Barcode): Promise<void> {
    if (barcode) {
      this.utils.modalCtrl.dismiss({ scanResult: barcode.displayValue });
    } else {
      this.utils.modalCtrl.dismiss({ scanResult: '' });
    }
  }
}
