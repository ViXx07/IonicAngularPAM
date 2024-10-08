import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from '@firebase/auth';
import { User } from '../../models/user.model';
import { doc, getDoc, setDoc, getFirestore } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseConfigService {
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);

  //Acceder
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //Cerrar sesión
  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    console.log(this.getAuth());
  }

  //Crear cuenta
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //Recuperar contraseña
  recoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  //Autenticación

  getAuth() {
    return getAuth();
  }

  // ===== Base de Datos ===== //

  //Crear/Cambiar datos del usuario
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  //Obtener datos del usuario
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }
}
