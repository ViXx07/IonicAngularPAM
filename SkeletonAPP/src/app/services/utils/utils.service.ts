import { inject, Injectable } from '@angular/core';
import {
  AlertController,
  AlertOptions,
  LoadingController,
  ModalController,
  ModalOptions,
  ToastController,
  ToastOptions,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);
  modalCtrl = inject(ModalController);
  alertCtrl = inject(AlertController);

  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  async presentAlert(opts?: AlertOptions) {
    const alert = await this.alertCtrl.create(opts);
    await alert.present();
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
      promptLabelPicture: 'Toma una foto:',
    });
  }

  async subirImagen(promptLabelHeader: string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos, //Permite elegir de donde viene la foto, en este caso desde la cámara o de la galeria.
      promptLabelHeader,
      promptLabelPhoto: 'Selecciona una imagen',
    });
  }

  getUserRole(): number {
    if (this.getFromLocalStorage('user')) {
      return this.getFromLocalStorage('user').userRole;
    } else return 0;
  }

  getUid(): number {
    if (this.getFromLocalStorage('user')) {
      return this.getFromLocalStorage('user').uid;
    } else return 0;
  }

  redireccionPorRol(rolUsuario: number) {
    switch (rolUsuario) {
      case 1: {
        this.routerlink('home');
        break;
      }
      case 2: {
        this.routerlink('admin-empresa');
        break;
      }
      case 3: {
        this.routerlink('admin');
        break;
      }
      default: {
        this.routerlink('login');
        break;
      }
    }
  }

  menuPorRol() {
    let rolUsuario = this.getUserRole();
    let paginas = [];
    switch (rolUsuario) {
      case 1: {
        return (paginas = [
          { titulo: 'Home', url: '/home', icono: 'person-outline' },
          {
            titulo: 'Contacto',
            url: '/home/contacto',
            icono: 'chatbubbles-outline',
          },
          {
            titulo: 'Registra tu empresa',
            url: '/home/registroEmpresa',
            icono: 'business-outline'
          }
        ]);
      }
      case 2: {
        return (paginas = [
          {
            titulo: 'AdminEmpresa',
            url: '/admin-empresa',
            icono: 'tv-outline',
          },
          {
            titulo: 'Contacto',
            url: '/admin-empresa/contacto',
            icono: 'chatbubbles-outline',
          },
          {
            titulo: 'Gráfico',
            url: 'admin-empresa/grafico',
            icono: 'bar-chart-outline'
          },
        ]);
      }
      case 3: {
        return (paginas = [
          { titulo: 'Admin', url: '/admin', icono: 'person-add-outline' },
          {
            titulo: 'Contacto',
            url: '/admin/contacto',
            icono: 'chatbubbles-outline',
          },
          {
            titulo: 'Lista de empresas',
            url: '/admin/empresas',
            icono: 'business-outline'
          },
          {
            titulo: 'Registro de empresas',
            url: 'admin/registroEmpresas',
            icono: 'business-outline'
          }
        ]);
      }
      default: {
        return (paginas = []);
      }
    }
  }
}
