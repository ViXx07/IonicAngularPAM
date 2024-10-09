import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from '@firebase/auth';
import { User } from '../../models/user.model';
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  getFirestore,
} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {getStorage, uploadString, ref, getDownloadURL} from 'firebase/storage';

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

  //Agregar un objeto a la base de datos
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  //Almacenamiento

  async subirImagen(path: string, dataUrl: string) {
    return uploadString(ref(getStorage(), path), dataUrl, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    })
  }
}
