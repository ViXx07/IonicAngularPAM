import { Component, inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecordarContrasenaComponent } from 'src/app/components/recordar-contrasena/recordar-contrasena.component';
import { RegistroClienteComponent } from 'src/app/components/registro-cliente/registro-cliente.component';
import { User } from 'src/app/models/user.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @Input() rolUsuario!: number;

  loginForm = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    userRole: new FormControl(),
  });

  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);

  async submit() {
    if (this.loginForm.valid) {
      const loading = await this.utils.loading();
      await loading.present();
      this.firebase
        .signIn(this.loginForm.value as User)
        .then((res) => {
          this.getUserInfo(res.user.uid);
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

  async getUserInfo(uid: string) {
    if (this.loginForm.valid) {
      let path = `users/${uid}`;
      this.loginForm.controls.uid.setValue(uid);

      this.firebase
        .getDocument(path)
        .then((user: User) => {
          this.loginForm.controls.userRole.setValue(user.userRole);
          this.rolUsuario = user.userRole;

          this.loginForm.controls.password.setValue('');

          this.utils.saveInlocalStorage('user', this.loginForm.value);
          this.loginForm.reset();

          this.utils.redireccionPorRol(this.rolUsuario);
          this.utils.presentToast({
            header: 'Login exitoso!',
            message: `Te damos la bienvenida ${user.email}`,
            duration: 2000,
            color: 'primary',
            position: 'middle',
            icon: 'person-circle-outline',
          });
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
        });
    }
  }

  recordarContrasena() {
    this.utils.presentarModal({
      component: RecordarContrasenaComponent,
    });
  }

  async loginGoogle() {
    this.firebase.googleAuth();
  }

  registroCliente() {
    this.utils.presentarModal({
      component: RegistroClienteComponent,
    })
  }
}
