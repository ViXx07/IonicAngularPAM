import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Empresa } from 'src/app/models/empresa.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-modificar-empresa',
  templateUrl: './modificar-empresa.component.html',
  styleUrls: ['./modificar-empresa.component.scss'],
})
export class ModificarEmpresaComponent {
  modificarEmpresa = new FormGroup({
    idEmpresa: new FormControl('', Validators.required),
    nombreEmpresa: new FormControl(''),
    logo: new FormControl(''),
  });

  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);
  empresas: Empresa[] = [];
  idEmpresaSeleccionada: string;
  empresaSeleccionada: Empresa;
  subirImagen = false;

  constructor() {}

  selectEmpresa(event: any) {
    this.empresaSeleccionada = event.detail.value;
    console.log(this.empresaSeleccionada.nombreEmpresa);
  }

  async submit() {
    if (this.modificarEmpresa.valid) {
      if (this.idEmpresaSeleccionada) {
        let path = `empresas/${this.idEmpresaSeleccionada}`;
        let dataUrl = this.modificarEmpresa.value.logo;
        let imagePath = await this.firebase.getFilePath(
          this.idEmpresaSeleccionada
        );

        if (this.subirImagen) {
          let imageUrl = await this.firebase.subirImagen(imagePath, dataUrl);
          this.modificarEmpresa.controls.logo.setValue(imageUrl);
        }

        const loading = await this.utils.loading();
        await loading.present();
        this.firebase
          .updateDocument(path, this.modificarEmpresa.value)
          .then(async (res) => {
            this.modificarEmpresa.reset;
            this.utils.routerlink('admin');
            this.utils.presentToast({
              message: 'Empresa registrada correctamente',
              duration: 2500,
              color: 'success',
              position: 'middle',
              icon: 'checkmark-circle-outline',
            });
            this.cerrarModal();
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
  }

  async logo() {
    const DataUrl = (await this.utils.subirImagen('Logo')).dataUrl;
    this.modificarEmpresa.controls.logo.setValue(DataUrl);
    this.subirImagen = true;
  }

  cerrarModal() {
    this.utils.cerrarModal();
  }

  getEmpresas() {
    let path = 'empresas';

    let sub = this.firebase.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log(res);
        this.empresas = res;
        sub.unsubscribe();
      },
    });
  }

  ionViewWillEnter() {
    this.getEmpresas();
  }
}
