import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Encuesta } from 'src/app/models/encuesta.model';
import { Estado } from 'src/app/models/estados.model';
import { User } from 'src/app/models/user.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { ApiRestService } from 'src/app/services/restApi/api-rest.service';
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
    estado: new FormControl(),
  });
  subirImagen = false;
  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);
  api = inject(ApiRestService);

  usuario = {} as User;

  encuestaBase: Encuesta;

  estado: Estado = Estado.espera;


  ngOnInit() {
    this.usuario = this.utils.getFromLocalStorage('user');
    if (this.utils.getUserRole() === 3) {
      this.estado = Estado.aprobado
    }
  }
  async submit() {
    if (this.registroEmpresa.valid) {
      let path = `empresas`;
      let dataUrl = this.registroEmpresa.value.logo;
      let imagePath = `empresas/${
        this.registroEmpresa.value.nombreEmpresa
      }/${Date.now()}`;

      if (this.subirImagen) {
        let imageUrl = await this.firebase.subirImagen(imagePath, dataUrl);
        this.registroEmpresa.controls.logo.setValue(imageUrl);
      }

      this.registroEmpresa.controls.estado.setValue(this.estado);

      const loading = await this.utils.loading();
      await loading.present();
      this.firebase
        .addDocument(path, this.registroEmpresa.value)
        .then(async (empresa) => {
          let idEmp = empresa.id;
          // Registro en la api:
          let empresaRegistrada = {
            id: idEmp,
            nombreEmpresa: this.registroEmpresa.controls.nombreEmpresa.value,
            logo: this.registroEmpresa.controls.logo.value,
            estado: this.estado,
          };
          this.api.createEmpresa(empresaRegistrada).subscribe((resultado) => {
            console.log(resultado);
          });
          // Registro de la encuesta base en firebase:
          const encuesta = await this.firebase.addDocument('encuestas', {
            pregunta: '',
            idEmpresa: idEmp,
          });
          this.registroEmpresa.reset();
          this.utils.routerlink('admin/empresas');
          this.utils.presentToast({
            message: 'Empresa registrada correctamente',
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
