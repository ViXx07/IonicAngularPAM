import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss'],
})
export class RegistroAdminComponent {
  registroAdmin = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    empresa: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    userRole: new FormControl(),
  });

  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);

  async submit() {
    if (this.registroAdmin.valid) {
      const loading = await this.utils.loading();
      await loading.present();
      this.firebase
        .signUp(this.registroAdmin.value as User)
        .then((res) => {
          let uid = res.user.uid;
          this.registroAdmin.controls.uid.setValue(uid);
          this.registroAdmin.controls.userRole.setValue(2);

          this.setUserInfo(uid);
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

  async setUserInfo(uid: string) {
    if (this.registroAdmin.valid) {
      let path = `users/${uid}`;
      delete this.registroAdmin.value.password;

      this.firebase
        .setDocument(path, this.registroAdmin.value)
        .then(async (res) => {
          this.registroAdmin.reset;
          this.utils.routerlink('home');
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

  cerrarModal(){
    this.utils.cerrarModal();
  }
}