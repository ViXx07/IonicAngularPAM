import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'; //Servicios para enviar datos al navegar a otra página.
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseConfigService } from 'src/app/services/firebase-config.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = new FormGroup({
    usuario: new FormControl("", Validators.required),
    contrasena: new FormControl("", Validators.required)
  });

  constructor() { }
  
  firebase = inject(FirebaseConfigService)
  
  login() {
    this.firebase.signIn(this.loginForm.value as User).then(res => {
      
    })
  }


  ngOnInit() {
  }
}
