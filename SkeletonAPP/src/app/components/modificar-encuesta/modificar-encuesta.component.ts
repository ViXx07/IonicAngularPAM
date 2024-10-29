import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Encuesta } from 'src/app/models/encuesta.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-modificar-encuesta',
  templateUrl: './modificar-encuesta.component.html',
  styleUrls: ['./modificar-encuesta.component.scss'],
})
export class ModificarEncuestaComponent {
  modificarEncuesta = new FormGroup({
    idEncuesta: new FormControl('', Validators.required),
    pregunta: new FormControl(''),
    evidencia: new FormControl(''),
  });

  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);
  encuestas: Encuesta[] = [];

  cerrarModal(){}

  getEncuestas() {
    let path = 'encuestas';

    let sub = this.firebase.getCollectionData(path).subscribe({
      next: (res: any) => {
        this.encuestas = res;
        sub.unsubscribe();
      },
    });
  }
  
  ionViewWillEnter() {
    this.getEncuestas();
  }

  async logo() {
    const DataUrl = (await this.utils.subirImagen('Logo')).dataUrl;
    this.modificarEncuesta.controls.evidencia.setValue(DataUrl);
  }

  submit(){}
}
