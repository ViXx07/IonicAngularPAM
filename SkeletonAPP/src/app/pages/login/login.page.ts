import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string = "";
  contrasena: string = "";

  constructor(private router: Router) { }

  login() {
    if (this.usuario === 'admin' && this.contrasena === '1234'){ //Cambiar al tener registro de usuario/contraseña
      const datosEnviados: NavigationExtras = {
        queryParams: {
          nombreUsuario: this.usuario,
        }
      }
      this.router.navigate(['/home'], datosEnviados);
    }
  }

  ngOnInit() {
  }




}
