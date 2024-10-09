import { inject, Injectable } from '@angular/core';
import {
  LoadingController,
  ModalController,
  ModalOptions,
  ToastController,
  ToastOptions,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);
  modalCtrl = inject(ModalController);

  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  routerlink(url: string) {
    return this.router.navigateByUrl(url);
  }

  saveInlocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  async presentarModal(opciones: ModalOptions) {
    const modal = await this.modalCtrl.create(opciones);

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) return data;
  }

  cerrarModal(data?: any) {
    return this.modalCtrl.dismiss(data);
  }

  async tomarFoto(promptLabelHeader: string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt, //Permite elegir de donde viene la foto, en este caso desde la cámara o de la galeria.
      promptLabelHeader,
      promptLabelPhoto: 'Selecciona una imagen:',
      promptLabelPicture: 'Toma una foto:'
       
    });
  }
}
