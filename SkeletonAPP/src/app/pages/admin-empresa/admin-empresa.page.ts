import { Component, inject, OnInit } from '@angular/core';
import { documentId, where } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { ModificarEncuestaComponent } from 'src/app/components/modificar-encuesta/modificar-encuesta.component';
import { registrarEncuestaComponent } from 'src/app/components/registrar-encuesta/registrar-encuesta.component';
import { Empresa } from 'src/app/models/empresa.model';
import { User } from 'src/app/models/user.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-admin-empresa',
  templateUrl: './admin-empresa.page.html',
  styleUrls: ['./admin-empresa.page.scss'],
})
export class AdminEmpresaPage implements OnInit {
  usuario: User;
  empresa: Empresa;
  private subscriptions: Subscription[] = [];

  utils = inject(UtilsService);
  firebase = inject(FirebaseConfigService);

  async ngOnInit() {
    const loading = await this.utils.loading();
    await loading.present();
  
    try {
      await this.getUser(); // Espera a que se recupere el usuario
      if (this.usuario) { // Solo llama a getEmpresa si usuario está definido
        this.getEmpresa();
      } else {
        console.error('No se encontró el usuario.'); // Manejo de error
      }
      await loading.dismiss();
    } catch (error) {
      console.error('Error loading data', error);
      await loading.dismiss();
    }
  }

  modificarEncuesta() {
    this.utils.presentarModal({
      component: ModificarEncuestaComponent,
    });
  }

  registrarEncuesta() {
    this.utils.presentarModal({
      component: registrarEncuestaComponent,
    });
  }

  getUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      const path = 'users';
      const uid = this.utils.getUid();
      const query = where('uid', '==', uid);
      const sub = this.firebase.getCollectionData(path, query).subscribe({
        next: (res: User[]) => {
          if (res.length > 0) {
            this.usuario = res[0]; // Asigna el primer usuario encontrado
          } else {
            this.usuario = null; // Maneja el caso donde no se encuentra el usuario
          }
          resolve(); // Resuelve la promesa aquí
        },
        error: (err) => {
          console.error('Error fetching user:', err);
          reject(err); // Rechaza la promesa en caso de error
        },
      });
  
      this.subscriptions.push(sub); // Guarda la suscripción
    });
  }
  getEmpresa() {
    const path = 'empresas';
    const empresaId = this.usuario.empresa;
    const query = where(documentId(), '==', empresaId);

    const sub = this.firebase.getCollectionData(path, query).subscribe({
      next: (res: Empresa[]) => {
        if (res.length > 0) {
          this.empresa = res[0]; // Asigna la primera empresa encontrada
        } else {
          this.empresa = null; // Maneja el caso donde no se encuentra la empresa
        }
      },
      error: (err) => {
        console.error('Error fetching empresa:', err);
      },
    });
  }
}
