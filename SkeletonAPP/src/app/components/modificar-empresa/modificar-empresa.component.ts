import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Empresa } from 'src/app/models/empresa.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { ApiRestService } from 'src/app/services/restApi/api-rest.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-modificar-empresa',
  templateUrl: './modificar-empresa.component.html',
  styleUrls: ['./modificar-empresa.component.scss'],
})
export class ModificarEmpresaComponent {
  modificarEmpresa = new FormGroup({
    nombreEmpresa: new FormControl('', Validators.required),
    logo: new FormControl(''),
  });

  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);
  api = inject(ApiRestService);

  @Input() empresa: Empresa;

  ionViewWillEnter() {
    this.modificarEmpresa.controls.nombreEmpresa.setValue(
      this.empresa.nombreEmpresa
    );
    this.modificarEmpresa.controls.logo.setValue(this.empresa.logo);
  }

  async submit() {
    if (
      this.modificarEmpresa.value.logo !== this.empresa.logo ||
      this.modificarEmpresa.value.nombreEmpresa !== this.empresa.nombreEmpresa
    ) {
      let path = `empresas/${this.empresa.id}`;

      const loading = await this.utils.loading();
      await loading.present();

      if (this.modificarEmpresa.value.logo !== this.empresa.logo) {
        let dataUrl = this.modificarEmpresa.value.logo;
        let imagePath = await this.firebase.getFilePath(this.empresa.logo);
        let imageUrl = await this.firebase.subirImagen(imagePath, dataUrl);
        this.modificarEmpresa.controls.logo.setValue(imageUrl);
      }
      this.firebase
        .updateDocument(path, this.modificarEmpresa.value)
        .then(async (res) => {
          //Modificación en la api
          let empresaModificada = {
            id: this.empresa.id,
            nombreEmpresa: this.modificarEmpresa.controls.nombreEmpresa.value,
            logo: this.modificarEmpresa.controls.logo.value,
          };
          this.api.updateEmpresa(empresaModificada).subscribe((resultado)=>{
            console.log('Empresa modificada.');
            
          });
          this.modificarEmpresa.reset;
          this.utils.routerlink('admin');
          this.utils.presentToast({
            message: 'Empresa modificada correctamente',
            duration: 2500,
            color: 'success',
            position: 'middle',
            icon: 'checkmark-circle-outline',
          });
          this.utils.cerrarModal({ success: true });
        })
        .catch((error) => {
          console.log(error);
          this.utils.presentToast({
            message: error.message,
            duration: 2500,
            color: 'danger',
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
    this.modificarEmpresa.controls.logo.setValue(DataUrl);
  }

  cerrarModal() {
    this.utils.cerrarModal();
  }
}
