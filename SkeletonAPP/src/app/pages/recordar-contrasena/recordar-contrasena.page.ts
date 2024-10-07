import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; //Servicios para validar Formularios.
import { FirebaseConfigService } from 'src/app/services/firebase-config.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-recordar-contrasena',
  templateUrl: './recordar-contrasena.page.html',
  styleUrls: ['./recordar-contrasena.page.scss'],
})
export class RecordarContrasenaPage implements OnInit {
  emailForm = new FormGroup({                                         //Definimos que utilizaremos un Formulario.
    email: new FormControl('',[Validators.required, Validators.email])//Indicaremos que se necesitara validadores.
  });

  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);

  async recuperar() {
    if (this.emailForm.valid) {

      this.firebase.recoveryEmail(this.emailForm.value.email).then(res => {
        this.utils.presentToast({
          message: "Correo enviado exitosamente",
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'mail-outline'
        })
      }).catch(error => {
        console.log(error);
        this.utils.presentToast({
          message: error.message,
          duration: 2500,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      })  
      
    }
  }

  ngOnInit() {
  }

}
