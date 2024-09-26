import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; //Servicios para validar Formularios.

@Component({
  selector: 'app-recordar-contrasena',
  templateUrl: './recordar-contrasena.page.html',
  styleUrls: ['./recordar-contrasena.page.scss'],
})
export class RecordarContrasenaPage implements OnInit {
  emailForm = new FormGroup({                                         //Definimos que utilizaremos un Formulario.
    email: new FormControl('',[Validators.required, Validators.email])//Indicaremos que se necesitara validadores.
  });

  constructor() {

  }

  ngOnInit() {
  }

}
