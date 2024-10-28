import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; //Servicios para validar Formularios.
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-recordar-contrasena',
  templateUrl: './recordar-contrasena.component.html',
  styleUrls: ['./recordar-contrasena.component.scss'],
})
export class RecordarContrasenaComponent {
  emailForm = new FormGroup({
    //Definimos que utilizaremos un Formulario.
    email: new FormControl('', [Validators.required, Validators.email]), //Indicaremos que se necesitara validadores.
  });

  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);

  async submit() {
    if (this.emailForm.valid) {
      const loading = await this.utils.loading();
      await loading.present();

      this.firebase
        .recoveryEmail(this.emailForm.value.email)
        .then((res) => {
          this.utils.presentToast({
            message: 'Correo enviado exitosamente',
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'mail-outline',
          });
          this.cerrarModal();
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

  cerrarModal(){
    this.utils.cerrarModal();
  }
}
