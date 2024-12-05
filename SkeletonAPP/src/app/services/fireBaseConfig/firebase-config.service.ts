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
  updateDoc,
  deleteDoc,
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
    password: '',
    userRole: 1,
  };

  //Acceder
  signIn(user: User) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password); 
  }

  //Cerrar sesión
  signOut() {
    this.auth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('empresa');
    localStorage.removeItem('encuesta');
  }

  //Crear cuenta
  signUp(user: User) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  //Recuperar contraseña
  recoveryEmail(email: string) {
    return this.auth.sendPasswordResetEmail(email); 
  }

  //Autenticación



  //Autenticación Google

  googleAuth = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    await signInWithPopup(getAuth(), provider);
    const loading = await this.utils.loading();
    await loading.present();
    this.user.email = (await this.auth.currentUser).email;
    this.user.uid = (await this.auth.currentUser).uid;
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
  //Crear datos
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  //Obtener datos
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }
//------------------------CRUD------------------------//
  //Agregar un documento 
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }
  //Obtener todos los documentos de una colección
  getCollectionData(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collectionQuery), { idField: 'id' });
  }
  //Actualizar documento
  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }
  //Borrar documento
  deleteDocument(path: string) {
    return deleteDoc(doc(getFirestore(), path));
  }
//---------------------------------------------------//
  
  //Almacenamiento

  async subirImagen(path: string, dataUrl: string) {
    return uploadString(ref(getStorage(), path), dataUrl, 'data_url').then(
      () => {
        return getDownloadURL(ref(getStorage(), path));
      }
    );
  }

  async getFilePath(url: string) {
    return ref(getStorage(), url).fullPath;
  }
  
}