import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'; //Servicios para enviar datos al navegar a otra página.
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseConfigService } from 'src/app/services/firebase-config.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  });
  
  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);

  login() {
    if (this.loginForm.valid) {

      this.firebase.signIn(this.loginForm.value as User).then(res => {
      
        this.getUserInfo(res.user.uid);

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

  async getUserInfo(uid: string) {
    if (this.loginForm.valid) {
      let path = `users/${uid}`;

      this.firebase.getDocument(path).then((user: User) => {

        this.loginForm.reset();
        this.utils.routerlink('home');

      this.utils.presentToast({
        message: `Te damos la bienvenida ${user.email}`,
        duration: 1500,
        color: 'warning',
        position: 'middle',
        icon: 'person-circle-outline'
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

}
