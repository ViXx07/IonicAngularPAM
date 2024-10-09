import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseConfigService } from './services/fireBaseConfig/firebase-config.service';
import { UtilsService } from './services/utils/utils.service';
import { User } from './models/user.model';
import { LoginPage } from './pages/login/login.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  paginas = [
    { titulo: 'Login', url: '/login', icono: 'menu-outline' },
    { titulo: 'Home', url: '/home', icono: 'person-outline' },
    { titulo: 'Admin', url: '/admin', icono: 'layers-outline' },
  ];

  router = inject(Router);
  firebase = inject(FirebaseConfigService);
  utils = inject(UtilsService);
  rutaActual = '';

  constructor() {
    this.initializeApp();
  }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event?.url) this.rutaActual = event.url;
    });
  }

  logout() {
    this.firebase.signOut();
  }

  usuario(): User {
    return this.utils.getFromLocalStorage('user');
  }

  initializeApp() {
    this.router.navigateByUrl('splash');
  }
}
