import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string = "";
  contrasena: string= "";

  login() {
    if
  (this.usuario === 'admin' &&
    this.contrasena === 'admin')//Cambiar al tener registro de usuario/contraseña
    {
      this.router.navigate(['/home']);
    }

  }
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
