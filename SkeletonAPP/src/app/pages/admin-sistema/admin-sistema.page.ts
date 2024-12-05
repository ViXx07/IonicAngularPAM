import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ModificarAdminComponent } from 'src/app/components/modificar-admin/modificar-admin.component';
import { RegistroAdminComponent } from 'src/app/components/registro-admin/registro-admin.component';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { where } from '@angular/fire/firestore';
import { ApiRestService } from 'src/app/services/restApi/api-rest.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-admin-sistema',
  templateUrl: './admin-sistema.page.html',
  styleUrls: ['./admin-sistema.page.scss'],
})
export class AdminSistemaPage implements OnInit, OnDestroy{

  admins: User[] = [];
  private subscriptions: Subscription[] = [];

  loadingData: boolean = true;
  platform = inject(Platform);
  utils = inject(UtilsService);
  firebase = inject(FirebaseConfigService);
  api = inject(ApiRestService);


  async ngOnInit() {
    const loading = await this.utils.loading();
    await loading.present();

    try {
      this.getAdmins(); 
    } catch (error) {
      console.error('Error loading data', error);
    }

    // Espera 2 segundos antes de cerrar el loading
    setTimeout(() => {
      loading.dismiss();
      this.loadingData = false; // Cambia a false una vez que los datos están cargados y después de la espera
    }, 1000); // 1000 milisegundos = 1 segundos
  }

  async mostrarRegistroAdmin() {
    let success = await this.utils.presentarModal({
      component: RegistroAdminComponent,
    });

    if (success) this.getAdmins();
  }



  async mostrarModificarAdmin(admin: User) {
    let success = await this.utils.presentarModal({
      component: ModificarAdminComponent,
      componentProps: { admin },
    });

    if (success) this.getAdmins();
  }

  
  getAdmins() {
    let path = 'users';
    let query = where('userRole', 'in', [2, 3]);
    const sub = this.firebase.getCollectionData(path, query).subscribe({
      next: (res: any) => {
        this.admins = res;
      },
      error: (err) => {
        console.error('Error fetching admins:', err);
      },
    });

    this.subscriptions.push(sub); // Guarda la suscripción
  }

  ngOnDestroy() {
    // Desuscribirse de todas las suscripciones
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  
}
