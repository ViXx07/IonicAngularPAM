import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Encuesta } from 'src/app/models/encuesta.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-modificar-encuesta',
  templateUrl: './modificar-encuesta.component.html',
  styleUrls: ['./modificar-encuesta.component.scss'],
})
export class ModificarEncuestaComponent implements OnInit {
  @Input() encuesta: Encuesta;

  modificarEncuesta = new FormGroup({
    pregunta: new FormControl('', Validators.required),
  });

  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);
  encuestas: Encuesta[] = [];

  ngOnInit() {
    this.modificarEncuesta.controls.pregunta.setValue(this.encuesta.pregunta);
  }

  cerrarModal() {
    this.utils.cerrarModal();
  }

  async submit() {
    let path = `encuestas/${this.encuesta.id}`;

    const loading = await this.utils.loading();
    await loading.present();

    this.firebase
      .updateDocument(path, this.modificarEncuesta.value)
      .then(async (res) => {
        this.modificarEncuesta.reset;
        this.utils.routerlink('admin-empresa');
        this.utils.presentToast({
          message: 'Encuesta registrada correctamente',
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
