import { Component, OnInit } from '@angular/core';
import { FormControl, Validator, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.page.html',
  styleUrls: ['./registro-admin.page.scss'],
})
export class RegistroAdminPage implements OnInit {

registro() {
throw new Error('Method not implemented.');
}
  registroAdmin = new FormGroup({
    usuario: new FormControl('', Validators.required),
    empresa: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
    contrasena2: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email])
  })

  constructor() { }

  ngOnInit() {
  }

}
