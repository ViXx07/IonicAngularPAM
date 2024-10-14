import { inject, Injectable } from '@angular/core';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from '@firebase/auth';
import { User } from '../../models/user.model';
import { UtilsService } from '../utils/utils.service';
import { FirebaseConfigService } from '../fireBaseConfig/firebase-config.service';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {

  user: User = {
    uid: '',
    email: '',
    password: 'xd',
    userRole: 1,
  };

  utils = inject(UtilsService);
  firebase = inject(FirebaseConfigService)

//Autenticación Google

async googleLogin() {

  const credential = await GoogleAuth.signIn();

  this.user.email = credential.email;
  this.user.uid = credential.id;
  this.utils.saveInlocalStorage('user', this.user);
  delete this.user.password;
  let path = `users/${this.user.uid}`;
  this.firebase.setDocument(path, this.user);
  this.utils
  .presentToast({
    header: 'Login exitoso!',
    message: `Te damos la bienvenida ${this.user.email}`,
    duration: 2000,
    color: 'primary',
    position: 'middle',
    icon: 'logo-google',
  })
  console.log(this.user);
};
}
