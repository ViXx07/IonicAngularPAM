import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from '@firebase/auth';
import { User } from '../../models/user.model';
import {
  doc,
  collectionData,
  query,
  getDoc,
  setDoc,
  addDoc,
  collection,
  getFirestore,
} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
} from 'firebase/storage';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseConfigService {
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utils = inject(UtilsService);
  user: User = {
    uid: '',
    email: '',
    password: 'xd',
    userRole: 1,
  };

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

  //Autenticación Google

  googleAuth = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    await signInWithPopup(getAuth(), provider);
    const loading = await this.utils.loading();
    await loading.present();
    this.user.email = this.getAuth().currentUser.email;
    this.user.uid = this.getAuth().currentUser.uid;
    this.utils.saveInlocalStorage('user', this.user);
    delete this.user.password;
    let path = `users/${this.user.uid}`;
    this.setDocument(path, this.user);
    this.utils.routerlink('home');
    this.utils
      .presentToast({
        header: 'Login exitoso!',
        message: `Te damos la bienvenida ${this.user.email}`,
        duration: 2000,
        color: 'primary',
        position: 'middle',
        icon: 'logo-google',
      })
      .finally(() => {
        loading.dismiss();
      });
  };

  // ===== Base de Datos ===== //

  //Obtener documentos de una colección
  getCollectionData(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collectionQuery), { idField: 'id' });
  }
  //Crear datos
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  //Obtener datos
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  //Agregar un objeto a la base de datos
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  //Almacenamiento

  async subirImagen(path: string, dataUrl: string) {
    return uploadString(ref(getStorage(), path), dataUrl, 'data_url').then(
      () => {
        return getDownloadURL(ref(getStorage(), path));
      }
    );
  }
}
