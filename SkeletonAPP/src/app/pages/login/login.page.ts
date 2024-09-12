import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() {
  }

  usuario: string = "";
  contrasena: string = "";

  login() {
    if (this.usuario === 'admin' && this.contrasena === '1234'){ //Cambiar al tener registro de usuario/contraseña
      
      this.storage.set('nombre_usuario', this.usuario);
      this.router.navigate(['/home']);
    }
  }
}
