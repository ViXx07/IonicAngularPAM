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
  
    firebase = inject(FirebaseConfigService);
    utils = inject(UtilsService);
  
    async submit() {}

    async logo() {
      const DataUrl = (await this.utils.subirImagen('Logo')).dataUrl;
      this.registroEmpresa.controls.logo.setValue(DataUrl);
    }
  
    cerrarModal(){
      this.utils.cerrarModal();
    }
  }
  