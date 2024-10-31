import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
@Component({
  selector: 'app-modificar-admin',
  templateUrl: './modificar-admin.component.html',
  styleUrls: ['./modificar-admin.component.scss'],
})
export class ModificarAdminComponent {
  modificarAdmin = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    empresa: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    userRole: new FormControl(),
  });

  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);

  async submit() {
    if (this.modificarAdmin.valid) {
      const loading = await this.utils.loading();
      await loading.present();
      this.firebase
        .signUp(this.modificarAdmin.value as User)
        .then((res) => {
          let uid = res.user.uid;
          this.modificarAdmin.controls.uid.setValue(uid);
          this.modificarAdmin.controls.userRole.setValue(2);

          this.setUserInfo(uid);
          this.utils.cerrarModal({success: true});
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
    if (this.modificarAdmin.valid) {
      let path = `users/${uid}`;
      delete this.modificarAdmin.value.password;

      this.firebase
        .setDocument(path, this.modificarAdmin.value)
        .then(async (res) => {
          this.modificarAdmin.reset;
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

