import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; //Servicios para validar Formularios.

@Component({
  selector: 'app-recordar-contrasena',
  templateUrl: './recordar-contrasena.page.html',
  styleUrls: ['./recordar-contrasena.page.scss'],
})
export class RecordarContrasenaPage implements OnInit {
  public emailForm: FormGroup;

  constructor( 
    private formBuilder: FormBuilder //Definimos que utilizaremos un Formulario.
  ) {
    this.emailForm = this.formBuilder.group({
      email: [undefined, Validators.required], //Indicaremos que se necesitara validadores.
    });}

  ngOnInit() {
  }

}
