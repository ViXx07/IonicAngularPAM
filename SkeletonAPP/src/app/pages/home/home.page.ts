import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {



  nombre: string = '';
  apellido: string = '';
  opcionSeleccionada: string | null = null;
  fechaNacimiento: any;
  fechaMax: any = new Date().toISOString();

  constructor(private alertController: AlertController) {}

  limpiarCampo() {
    this.nombre = '';
    this.apellido = '';
    this.opcionSeleccionada = null;
    this.fechaNacimiento = undefined;
  }

  async validacionCampos() {

    if(this.nombre === ""){
      const alert = await this.alertController.create({
        header: 'Ingrese su nombre.',
        buttons: ['Cerrar'],
      });
      await alert.present();
      return null;
    }
    if(this.apellido === ""){
      const alert = await this.alertController.create({
        header: 'Ingrese su apellido.',
        buttons: ['Cerrar'],
      });
      await alert.present();
      return null;
    }
    if(this.opcionSeleccionada === null){
      const alert = await this.alertController.create({
        header: 'Seleccione su nivel educacional.',
        buttons: ['Cerrar'],
      });
      await alert.present();
      return null;
    }
    if(this.fechaNacimiento === undefined){
      const alert = await this.alertController.create({
        header: 'Seleccione su fecha de nacimiento.',
        buttons: ['Cerrar'],
      });
      await alert.present();
      return null;
    }
    else{
      const alert = await this.alertController.create({
        header: 'Bienvenido '+this.nombre+' '+this.apellido,
        buttons: ['Cerrar'],
      });
      await alert.present();
      return true;
    }
  }
  showdate() {
    return this.fechaMax;
    }
}


