import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  estado: string = "";
  usuario: string = "";

  async ngOnInit() {
    this.usuario = await this.storage.get('nombre_usuario');

    if (this.usuario === 'admin'){
      this.estado = "correcto";
    }else {
      this.estado = "";
    }
  }

  constructor(private storage: Storage) {}
}
