import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.scss'],
})
export class RegistroClienteComponent {
  registroCliente = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    empresa: new FormControl('',),
    password: new FormControl('', Validators.required),
    userRole: new FormControl(),
  });

  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);

  async submit() {
    if (this.registroCliente.valid) {
      const loading = await this.utils.loading();
      await loading.present();
      this.firebase
        .signUp(this.registroCliente.value as User)
        .then((res) => {
          let uid = res.user.uid;
          this.registroCliente.controls.uid.setValue(uid);
          this.registroCliente.controls.userRole.setValue(1);
          this.setUserInfo(uid);
          this.utils.presentToast({
            header: 'Registro exitoso!',
            message: `Bienvenid@ ${res.user.email}`,
            duration: 2000,
            color: 'primary',
            position: 'middle',
            icon: 'person-circle-outline',
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
          this.cerrarModal();
        });
    }
  }

  async setUserInfo(uid: string) {
    if (this.registroCliente.valid) {
      let path = `users/${uid}`;
      delete this.registroCliente.value.password;

      this.firebase
        .setDocument(path, this.registroCliente.value)
        .then(async (res) => {
          this.registroCliente.reset;
          this.utils.redireccionPorRol(1);
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
        });
    }
  }

  cerrarModal() {
    this.utils.cerrarModal();
  }
}
