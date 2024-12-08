import { Component, inject } from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage {

  clip = inject(Clipboard);


  contactos: any[]= [
    {key: 'Whatsapp', value: '+123456789 '},
    {key: 'Correo', value: 'correo@corre.ito'},
    {key: 'Página Web', value: 'www.QueOpinas.cl'}
  ]

  getText(texto: string){
    this.clip.copy(texto);
  }
}
