import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nombre: string = '';
  apellido: string = '';
  opcionSeleccionada: string | null = null;

  constructor() {}

  limpiarCampo() {
    this.nombre = '';
    this.apellido = '';
    this.opcionSeleccionada = null;
  }
}
