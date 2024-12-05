import { Component, ElementRef, Inject, Input, NgZone, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { BarcodeFormat, BarcodeScanner, LensFacing, StartScanOptions } from '@capacitor-mlkit/barcode-scanning';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Platform } from '@ionic/angular';  // Import Platform service to detect platform
import { Torch } from '@capawesome/capacitor-torch';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public formats: BarcodeFormat[] = [];
  @Input() public lensFacing: LensFacing = LensFacing.Back;

  @ViewChild('square') utils = Inject(UtilsService);
  public squareElement: ElementRef<HTMLDivElement> | undefined;
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
}
