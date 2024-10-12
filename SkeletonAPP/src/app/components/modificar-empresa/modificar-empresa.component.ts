import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
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

  async submit() {}

  async logo() {
    const DataUrl = (await this.utils.subirImagen('Logo')).dataUrl;
    this.modificarEmpresa.controls.logo.setValue(DataUrl);
  }

  cerrarModal(){
    this.utils.cerrarModal();
  }
}
