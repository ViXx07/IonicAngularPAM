import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Empresa } from 'src/app/models/empresa.model';
import { Encuesta } from 'src/app/models/encuesta.model';
import { User } from 'src/app/models/user.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-opina',
  templateUrl: './opina.page.html',
  styleUrls: ['./opina.page.scss'],
})
export class OpinaPage implements OnInit {
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} carácteres restantes.`;
  }

  @Input() empresa: any;
  @Input() encuesta: Encuesta;
  @Input() deshabilitado: boolean;

  usuario = {} as User;
  subirEvidencia = false;

  ngOnInit() {
    this.usuario = this.utils.getFromLocalStorage('user');
  }
  encuestaForm = new FormGroup({
    idEmpresa: new FormControl('' /*Validators.required*/),
    tipoDeOpinion: new FormControl('', [
      Validators.required,
      Validators.min(0),
    ]),
    comentario: new FormControl(''),
    evidencia: new FormControl(''),
    idUsuario: new FormControl(''),
  });

  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);

  async submit() {
    if (this.encuestaForm.valid) {
      let path = `empresas/${this.encuesta.idEmpresa}/respuestas`;
      let dataUrl = this.encuestaForm.value.evidencia;
      let imagePath = `${this.usuario.uid}/${Date.now()}`;

      this.encuestaForm.controls.idEmpresa.setValue(this.encuesta.idEmpresa);

      if(this.subirEvidencia) {
        let imageUrl = await this.firebase.subirImagen(imagePath, dataUrl);
        this.encuestaForm.controls.evidencia.setValue(imageUrl);
      }

      this.encuestaForm.controls.idUsuario.setValue(this.utils.getUid().toString());

      const loading = await this.utils.loading();
      await loading.present();
      this.firebase
        .addDocument(path, this.encuestaForm.value)
        .then(async (res) => {
          this.encuestaForm.reset;
          this.cerrarModal();
          this.utils.routerlink('home');
          this.utils.presentToast({
            message: 'Encuesta enviada correctamente',
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

  //Tomar o subir una foto.
  async evidencia() {
    const DataUrl = (await this.utils.tomarFoto('Evidencia')).dataUrl;
    this.encuestaForm.controls.evidencia.setValue(DataUrl);
    this.subirEvidencia = true;
  }

  cerrarModal() {
    this.utils.cerrarModal();
  }
}
