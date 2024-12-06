import { Component, inject, Input, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { Empresa } from 'src/app/models/empresa.model';
import { Encuesta } from 'src/app/models/encuesta.model';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.component.html',
  styleUrls: ['./generar-qr.component.scss'],
})
export class GenerarQrComponent {
  @Input() empresa: Empresa;
  @Input() encuesta: Encuesta;

  utils = inject(UtilsService);
  platform = inject(Platform);

  capturarQR() {
    const element = document.getElementById("qr");

    html2canvas(element).then((canvas: HTMLCanvasElement) => {
      if(this.platform.is('capacitor')) {
        this.compartirQR(canvas);
      }
      else {
        this.descargarQR(canvas);
      }

    })
  }

  descargarQR(canvas: HTMLCanvasElement) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'qr.png';
    link.click();
  }

  async compartirQR(canvas: HTMLCanvasElement) {

    let base64 = canvas.toDataURL();
    let path = 'qr.png';

    const loading = await this.utils.loading();
    await loading.present();

      await Filesystem.writeFile({
        path,
        data: base64,
        directory: Directory.Cache,
      }).then(async (res) => {
        let uri = res.uri;

        await Share.share({url: uri,});

        await Filesystem.deleteFile({
          path,
          directory: Directory.Cache
        })
      }).finally(() => {
        loading.dismiss();
      });
  }

  cerrarModal(){
    this.utils.cerrarModal();
  }
}
