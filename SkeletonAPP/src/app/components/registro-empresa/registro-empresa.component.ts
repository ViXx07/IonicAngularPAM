import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.scss'],
})
export class RegistroEmpresaComponent {
  registroEmpresa = new FormGroup({
    nombreEmpresa: new FormControl('', Validators.required),
    logo: new FormControl(''),
  });
  subirImagen = false;
  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);

  usuario = {} as User;

  ngOnInit() {
    this.usuario = this.utils.getFromLocalStorage('user');
  }
  async submit() {
    if (this.registroEmpresa.valid) {
      let path = `empresas`;
      let dataUrl = this.registroEmpresa.value.logo;
      let imagePath = `empresas/${this.registroEmpresa.value.nombreEmpresa}/${Date.now()}`;

      if (this.subirImagen) {
        let imageUrl = await this.firebase.subirImagen(imagePath, dataUrl);
        this.registroEmpresa.controls.logo.setValue(imageUrl);
      }

      const loading = await this.utils.loading();
      await loading.present();
      this.firebase
        .addDocument(path, this.registroEmpresa.value)
        .then(async (res) => {
          this.registroEmpresa.reset;
          this.utils.routerlink('admin');
          this.utils.presentToast({
            message: 'Empresa registrada correctamente',
            duration: 2500,
            color: 'success',
            position: 'middle',
            icon: 'checkmark-circle-outline',
          });
        })
        .catch((error) => {
          console.log(error);
          this.utils.presentToast({
            message: error.message,
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'alert-circle-outline',
          });
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }

  async logo() {
    const DataUrl = (await this.utils.subirImagen('Logo')).dataUrl;
    this.registroEmpresa.controls.logo.setValue(DataUrl);
    this.subirImagen = true;
  }

  cerrarModal() {
    this.utils.cerrarModal();
  }
}
