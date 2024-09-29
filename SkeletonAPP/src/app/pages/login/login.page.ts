import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'; //Servicios para enviar datos al navegar a otra página.
import { AuthService } from 'src/app/services/auth.service';


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

  constructor(private authService: AuthService, public router: Router) { }

  login() {
    this.authService.log();
    this.router.navigate(['admin']);
  }

  ngOnInit() {
  }
}
