import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //Ruta para recibir una variable.
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nombreUsuarioRecibido!: string; //Variable a recibir.
  firebase = inject(FirebaseConfigService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.nombreUsuarioRecibido = params['nombreUsuario']; //Query donde se envia la variable.
    })
  }

  logout() {
    this.firebase.signOut();
    }

  
}
