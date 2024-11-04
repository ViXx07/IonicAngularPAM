import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Empresa } from 'src/app/models/empresa.model';
import { User } from 'src/app/models/user.model';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
@Component({
  selector: 'app-modificar-admin',
  templateUrl: './modificar-admin.component.html',
  styleUrls: ['./modificar-admin.component.scss'],
})
export class ModificarAdminComponent {

  empresas: Empresa[];

  @Input() admin: User;

  modificarAdmin = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    empresa: new FormControl('', Validators.required),
    userRole: new FormControl(),
  });

  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);

  async submit() {
    if (this.modificarAdmin.valid) {
      let path = `users/${this.admin.uid}`;
      const loading = await this.utils.loading();
      await loading.present();
      this.firebase
        .updateDocument(path,this.modificarAdmin.value as User)
        .then((res) => {
          this.utils.presentToast({
            message: 'Administrador modificado con exito',
            duration: 2500,
            color: 'success',
            position: 'middle',
            icon: 'checkmark-circle-outline',
          });
          this.utils.cerrarModal({success: true});
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

  getEmpresa() {
    let path = 'empresas';

    let sub = this.firebase.getCollectionData(path).subscribe({
      next: (res: any) => {
        this.empresas = res;
        sub.unsubscribe();
      },
    });
  }

  ionViewWillEnter() {
    this.getEmpresa();
    this.modificarAdmin.controls.uid.setValue(this.admin.uid);
    this.modificarAdmin.controls.email.setValue(this.admin.email);
    this.modificarAdmin.controls.empresa.setValue(this.admin.empresa);
    this.modificarAdmin.controls.userRole.setValue(this.admin.userRole);
  }

  cerrarModal(){
    this.utils.cerrarModal();
  }
}

