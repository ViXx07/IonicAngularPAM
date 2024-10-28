import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Empresa } from 'src/app/models/empresa.model';

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

  empresas: Empresa[] = [];
  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);
  rol = false;

  async submit() {
    if (this.registroAdmin.valid) {
      const loading = await this.utils.loading();
      await loading.present();
      this.firebase
        .signUp(this.registroAdmin.value as User)
        .then((res) => {
          let uid = res.user.uid;
          this.registroAdmin.controls.uid.setValue(uid);
          if (this.rol) {
            this.registroAdmin.controls.userRole.setValue(3);
          } else {
            this.registroAdmin.controls.userRole.setValue(2);
          }
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
    if (this.registroAdmin.valid) {
      let path = `users/${uid}`;
      delete this.registroAdmin.value.password;

      this.firebase
        .setDocument(path, this.registroAdmin.value)
        .then(async (res) => {
          this.registroAdmin.reset;
          this.utils.redireccionPorRol(3);
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

  getEmpresa() {
    let path = 'empresas';

    let sub = this.firebase.getCollectionData(path).subscribe({
      next: (res: any) => {
        this.empresas = res;
        sub.unsubscribe();
      },
    });
  }

  ionViewWillEnter() {
    this.getEmpresa();
  }

  cambiarRol() {
    if (this.rol) {
      this.rol = false;
    } else {
      this.rol = true;
    }
  }
}
