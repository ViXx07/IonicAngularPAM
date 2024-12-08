import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
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
import { concatMap, delay, EMPTY, from, interval, Observable, of, retryWhen, switchMap, takeUntil, tap, throwError, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseConfigService {

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private utils: UtilsService
  ) {}

  user: User = {
    uid: '',
    email: '',
    password: '',
    userRole: 1,
  };

  isCircuitOpen = false;

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
  //return (await getDoc(doc(getFirestore(), path))).data();
  
  async getDocument(path: string): Promise<any> {
    const maxRetries = 3; // Número máximo de intentos
    const circuitBreakerTimeout = 10000; // Tiempo de espera en ms (10 segundos)
    
    try {
      return (await getDoc(doc(getFirestore(), path))).data();
    } catch (error) {
      
    // Si el circuito está abierto, deshabilitamos la función y mostramos un mensaje
    if (this.isCircuitOpen) {
      console.log('El circuito está abierto. La función no está disponible temporalmente.');
      return Promise.reject(new Error('El circuito está abierto. La función no está disponible temporalmente.'));
    }
  
    // Llamada real para obtener el documento
    const getDocumentPromise = this.getDocument(path);
  
    // Convertimos la promesa en un observable y aplicamos la política de reintentos con circuit breaker
    return from(getDocumentPromise).pipe(
      retryWhen((errors) =>
        errors.pipe(
          concatMap((error, attempt) => {
            if (attempt < maxRetries) {
              console.log(`Intento ${attempt + 1} fallido. Reintentando en 2 segundos...`);
              return of(error).pipe(delay(2000)); // Retrasar 2 segundos entre intentos
            } else {
              console.log('Número máximo de intentos alcanzado. Abriendo el circuito...');
              
              // Abrimos el circuito y esperamos el tiempo definido
              this.isCircuitOpen = true; // Activamos el circuito abierto
  
              // Después de esperar el tiempo de espera del circuit breaker, no se hace más reintentos
              return timer(circuitBreakerTimeout).pipe( // Esperamos el tiempo de espera del circuit breaker
                tap(() => {
                  console.log('El circuito ha sido cerrado. Puede realizar un nuevo intento.');
                  this.isCircuitOpen = false; // Cerramos el circuito después del tiempo de espera
                }),
                // No continuamos con más reintentos, solo cerramos el circuito
                switchMap(() => EMPTY)
              );
            }
          })
        )
      ),
      tap(() => {
        console.log('No se harán más reintentos automáticos. El flujo ha finalizado.');
      })
    ).toPromise(); // Convertimos el Observable nuevamente a una Promesa
  }
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
