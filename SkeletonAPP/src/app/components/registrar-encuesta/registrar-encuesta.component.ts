import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Encuesta } from 'src/app/models/encuesta.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-registrar-encuesta',
  templateUrl: './registrar-encuesta.component.html',
  styleUrls: ['./registrar-encuesta.component.scss'],
})
export class registrarEncuestaComponent {
  modificarEncuesta = new FormGroup({
    idEncuesta: new FormControl('', Validators.required),
    pregunta: new FormControl(''),
    evidencia: new FormControl(''),
  });

  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);
  encuestas: Encuesta[] = [];

  cerrarModal(){
    this.utils.cerrarModal();
  }


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
