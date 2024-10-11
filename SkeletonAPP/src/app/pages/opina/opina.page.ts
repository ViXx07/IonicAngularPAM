import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  usuario = {} as User;
  subirEvidencia = false;

  ngOnInit() {
    this.usuario = this.utils.getFromLocalStorage('user');
  }
  encuesta = new FormGroup({
    idEmpresa: new FormControl('' /*Validators.required*/),
    tipoDeOpinion: new FormControl('', [
      Validators.required,
      Validators.min(0),
    ]),
    comentario: new FormControl(''),
    evidencia: new FormControl(''),
  });

  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);

  async submit() {
    if (this.encuesta.valid) {
      let path = `users/${this.usuario.uid}/respuestas`;
      let dataUrl = this.encuesta.value.evidencia;
      let imagePath = `${this.usuario.uid}/${Date.now()}`;

      if(this.subirEvidencia) {
        let imageUrl = await this.firebase.subirImagen(imagePath, dataUrl);
        this.encuesta.controls.evidencia.setValue(imageUrl);
      }

      const loading = await this.utils.loading();
      await loading.present();
      this.firebase
        .addDocument(path, this.encuesta.value)
        .then(async (res) => {
          this.encuesta.reset;
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
    this.encuesta.controls.evidencia.setValue(DataUrl);
    this.subirEvidencia = true;
  }
}
